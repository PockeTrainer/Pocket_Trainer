import cv2

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
protoFile = "C:\mpi\mpi.prototxt"
weightsFile = "C:\mpi\mpi.caffemodel"

# load network model
net = cv2.dnn.readNetFromCaffe(protoFile, weightsFile)

# use cuda
net.setPreferableBackend(cv2.dnn.DNN_BACKEND_CUDA)
net.setPreferableTarget(cv2.dnn.DNN_TARGET_CUDA)

# input options
inputHeight = 368
inputWidth = 368
inputScale = 1.0/255

def make_pose_estimation_frame(frame):
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
    
    return frame
