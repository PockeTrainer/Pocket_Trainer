from django.shortcuts import render
from django.views.decorators import gzip
from django.http import StreamingHttpResponse
import cv2
import threading

#https://blog.miguelgrinberg.com/post/video-streaming-with-flask/page/8


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.video.open(0)  #추가
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()

    def __del__(self):
        self.video.release()

    def get_frame(self):
        #success, image = self.video.read()
        #success,image = self.url.read()
        #image = self.frame
        #gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
		#_, jpeg = cv2.imencode('.jpg', gray)
        face_detection_webcam = cv2.CascadeClassifier('D:\\python\haarcascade_frontalface_default.xml')

        image = self.frame
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        faces_detected = face_detection_webcam.detectMultiScale(gray, scaleFactor=1.3, minNeighbors=5)
        for (x, y, w, h) in faces_detected:
            cv2.rectangle(image, pt1=(x, y), pt2=(x + w, y + h), color=(255, 0, 0), thickness=2)
        frame_flip = cv2.flip(image,1)
        _, jpeg = cv2.imencode('.jpg', frame_flip)
        return jpeg.tobytes()
        # image = self.frame
        # _, jpeg = cv2.imencode('.jpg', image)
        # return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()


str = "Funny Text inside the box"

def gen(camera):
    while True:
        #frame = camera.read()
        frame = camera.get_frame()
        
        # str2 = "Testing . . ."
        # cv2.putText(frame, str, (5, 20), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0))
        # cv2.putText(frame, str2, (100, 20), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0))
        # cv2.imshow('Cam', cv2.resize(frame, (1300, 800)))
        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@gzip.gzip_page
def detectme(request):
    try:
        cam = VideoCamera()
        return StreamingHttpResponse(gen(cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        print("에러입니다...")
        pass

video_capture = cv2.VideoCapture(0)

# def detectme(request):
#     while (True):
#         grabbed, frame = video_capture.read()
#         cv2.imshow('Original Video', frame)

#         key = cv2.waitKey(1);
#         if key == ord('q'):
#             break

#         video_capture.release()
#         cv2.destroyAllWindows()

# def index(request):
#     	return render(request, 'streamapp/home.html')


# def gen(camera):
# 	while True:
# 		frame = camera.get_frame()
# 		yield (b'--frame\r\n'
# 				b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


# def video_feed(request):
# 	return StreamingHttpResponse(gen(VideoCamera()),
# 					content_type='multipart/x-mixed-replace; boundary=frame')


# def webcam_feed(request):
# 	return StreamingHttpResponse(gen(IPWebCam()),
# 					content_type='multipart/x-mixed-replace; boundary=frame')


# def mask_feed(request):
# 	return StreamingHttpResponse(gen(MaskDetect()),
# 					content_type='multipart/x-mixed-replace; boundary=frame')
					
# def livecam_feed(request):
# 	return StreamingHttpResponse(gen(LiveWebCam()),
# 					content_type='multipart/x-mixed-replace; boundary=frame')
