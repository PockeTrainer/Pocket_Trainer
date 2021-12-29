from django.shortcuts import render
from django.views.decorators import gzip
from django.http import StreamingHttpResponse
import cv2
import threading

# 이거 쓰거나 ai 폴더 내에 opencv_openpose.py 쓰는 것 중 고르기
from . import pose

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

        # pose.py 에서 자세 추정을 입힌 frame을 가져옴
        image = pose.make_pose_estimation_frame(self.frame)

        frame_flip = cv2.flip(image,1)
        _, jpeg = cv2.imencode('.jpg', frame_flip)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()


def gen(camera):
    while True:
        frame = camera.get_frame()
        
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
