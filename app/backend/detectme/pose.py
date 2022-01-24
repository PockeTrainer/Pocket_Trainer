import cv2
from math import atan2, degrees

# point
BODY_PARTS = { "머리": 0, "목": 1, "오른쪽_어깨": 2, "오른쪽_팔꿈치": 3, "오른쪽_손목": 4,
                "왼쪽_어깨": 5, "왼쪽_팔꿈치": 6, "왼쪽_손목": 7, "오른쪽_엉덩이": 8, "오른쪽_무릎": 9,
                "오른쪽_발목": 10, "왼쪽_엉덩이": 11, "왼쪽_무릎": 12, "왼쪽_발목": 13, "가슴": 14,
                "배경": 15 }

# pair
POSE_PAIRS = [ ["머리", "목"], ["목", "오른쪽_어깨"], ["오른쪽_어깨", "오른쪽_팔꿈치"],
                ["오른쪽_팔꿈치", "오른쪽_손목"], ["목", "왼쪽_어깨"], ["왼쪽_어깨", "왼쪽_팔꿈치"],
                ["왼쪽_팔꿈치", "왼쪽_손목"], ["목", "가슴"], ["가슴", "오른쪽_엉덩이"], ["오른쪽_엉덩이", "오른쪽_무릎"],
                ["오른쪽_무릎", "오른쪽_발목"], ["가슴", "왼쪽_엉덩이"], ["왼쪽_엉덩이", "왼쪽_무릎"], ["왼쪽_무릎", "왼쪽_발목"] ]

# threshold
threshold = 0.1

# files for pose estimation
protoFile = "..\\backend\\detectme\\mpi\\mpi.prototxt"
weightsFile = "..\\backend\\detectme\\mpi\\mpi.caffemodel"

# load network model
net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

# use cuda
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# input options
inputHeight = 368
inputWidth = 368
inputScale = 1.0/255


def jointAngle(p1, p2, p3):
    if p1 == None or p2 == None or p3 == None :
        return None
    else :
        deg = 0
        deg1 = (360 + degrees(atan2(p1[0] - p2[0], p1[1] - p2[1]))) % 360
        deg2 = (360 + degrees(atan2(p3[0] - p2[0], p3[1] - p2[1]))) % 360

        if deg1 <= deg2 :
            deg = deg2 - deg1
        else :
            deg = 360 - (deg1 - deg2)

        if deg > 180 :
            deg = 360 - deg

        return deg

# 팔굽혀펴기
leftArmAngles = []
rightArmAngles = []
centerAngles = []

numberOfPushUp = 0

# 윗몸일으키기
leftWaistAngles = []
rightWaistAngles = []

numberOfSitUp = 0

# 스쿼트
leftLegAngles = []
rightLegAngles = []

numberOfSquat = 0

# 갯수
numberingStack = []

# kindsOfExercise = int(input('무슨 운동을 할까요? (1: 팔굽혀펴기, 2: 윗몸일으키기, 3: 스쿼트) : '))

# 이 변수가 뭐냐에 따라서 어떤 운동을 카운트할지가 결정됨.
kindsOfExercise = ''

def make_pose_estimation_frame(frame, pos):
    flag = False
    global numberOfPushUp, numberOfSitUp, numberOfSquat, kindsOfExercise

    kindsOfExercise = pos

    frameHeight, frameWidth, _ = frame.shape

    # get blob
    netInput = cv2.dnn.blobFromImage(frame, inputScale, (inputWidth, inputHeight), (0, 0, 0), swapRB=False, crop=False)

    net.setInput(netInput)

    out = net.forward()

    points = []

    for i in range(len(BODY_PARTS)):
        heat_map = out[0, i, :, :]

        _, conf, _, point = cv2.minMaxLoc(heat_map)

        x = int((frameWidth * point[0]) / out.shape[3])
        y = int((frameHeight * point[1]) / out.shape[2])

        if conf > threshold:
            # draw circle and position text
            cv2.circle(frame, (x, y), 3, (0, 255, 255), thickness=-1, lineType=cv2.FILLED)
            cv2.putText(frame, "{}".format(i), (x, y), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 1, lineType=cv2.LINE_AA)

            # append joint point
            points.append((x, y))
        else:
            points.append(None)
    
    for pair in POSE_PAIRS:
        partFrom = pair[0]
        partTo = pair[1]

        id_from = BODY_PARTS[partFrom]
        id_to = BODY_PARTS[partTo]

        if points[id_from] and points[id_to]:
            # draw line between circles(joint points)
            cv2.line(frame, points[id_from], points[id_to], (0, 255, 0), 1)
    
    # 팔굽혀펴기
    if kindsOfExercise == 'pushup':
        leftArmAngle = jointAngle(points[5], points[6], points[7])
        leftArmAngles.append(leftArmAngle)

        rightArmAngle = jointAngle(points[2], points[3], points[4])
        rightArmAngles.append(rightArmAngle)

        if leftArmAngle != None and rightArmAngle != None:
            if int(leftArmAngle) < 90 and rightArmAngle < 90:
                if not numberingStack or numberingStack[-1] != 1:
                    numberingStack.append(1)
                    print("folding")

            if int(leftArmAngle) > 170 and rightArmAngle > 170 and numberingStack:
                numberingStack.pop()
                print("unfolding")
                numberOfPushUp = numberOfPushUp + 1
                flag = True

        print("팔굽혀펴기 갯수: " + str(numberOfPushUp) + ", 왼팔 각도: " + str(leftArmAngle) + ", 오른팔 각도: " + str(leftArmAngle))
        print(numberingStack)
        # 팔굽혀펴기 횟수 화면에 출력
        cv2.putText(frame, str(numberOfPushUp), (30, 120), cv2.FONT_HERSHEY_SIMPLEX, 5.0, (0, 0, 0), thickness=3)

    # 윗몸일으키기
    elif kindsOfExercise == 'situp':
        leftWaistAngle = jointAngle(points[14], points[11], points[12])
        leftWaistAngles.append(leftWaistAngle)

        rightWaistAngle = jointAngle(points[14], points[8], points[9])
        rightWaistAngles.append(rightWaistAngle)

        if leftWaistAngle != None and rightWaistAngle != None:
            if leftWaistAngle < 30 and rightWaistAngle < 30:
                if not numberingStack or numberingStack[-1] != 1:
                    numberingStack.append(1)
                    print("folding")

            if leftWaistAngle > 90 and rightWaistAngle > 90 and numberingStack:
                numberingStack.pop()
                print("unfolding")
                numberOfSitUp = numberOfSitUp + 1

        print("윗몸일으키기 갯수: " + str(numberOfSitUp) + ", 왼팔 각도: " + str(leftWaistAngle) + ", 오른팔 각도: " + str(rightWaistAngle))
        print(numberingStack)
        # 윗몸일으키기 횟수 화면에 출력
        cv2.putText(frame, str(numberOfSitUp), (30, 120), cv2.FONT_HERSHEY_SIMPLEX, 5.0, (0, 0, 0), thickness=3)

    # 스쿼트
    elif kindsOfExercise == 'squat':
        leftLegAngle = jointAngle(points[11], points[12], points[13])
        leftLegAngles.append(leftLegAngle)

        rightLegAngle = jointAngle(points[8], points[9], points[10])
        rightLegAngles.append(rightLegAngle)

        if leftLegAngle != None and rightLegAngle != None:
            if int(leftLegAngle) < 90 and rightLegAngle < 90:
                if not numberingStack or numberingStack[-1] != 1:
                    numberingStack.append(1)
                    print("folding")

            if int(leftLegAngle) > 170 and rightLegAngle > 170 and numberingStack:
                numberingStack.pop()
                print("unfolding")
                numberOfSquat = numberOfSquat + 1

        print("스쿼트 갯수: " + str(numberOfSquat) + ", 왼팔 각도: " + str(leftLegAngle) + ", 오른팔 각도: " + str(rightLegAngle))
        print(numberingStack)
        # 스쿼트 횟수 화면에 출력
        cv2.putText(frame, str(numberOfSquat), (30, 120), cv2.FONT_HERSHEY_SIMPLEX, 5.0, (0, 0, 0), thickness=3)
    
    frame = cv2.flip(frame, 1)
    return (frame, flag)
