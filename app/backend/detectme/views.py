from django.shortcuts import render
from django.views.decorators import gzip
from django.http import StreamingHttpResponse
import cv2
import threading

# 이거 쓰거나 ai 폴더 내에 opencv_openpose.py 쓰는 것 중 고르기
from . import pose


pos = ''
#https://blog.miguelgrinberg.com/post/video-streaming-with-flask/page/8


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.video.open(0)  #추가
        (self.grabbed, self.frame) = self.video.read()
        th = threading.Thread(target=self.update, args=())
        th.daemon = True
        th.start()

    def __del__(self):
        self.video.release()

    def get_frame(self, cnt):
        global pos
        # pose.py 에서 자세 추정을 입힌 frame을 가져옴
        image, flag = pose.make_pose_estimation_frame(self.frame, pos)
        if flag:
            cnt += 1
        print(cnt)
        frame_flip = cv2.flip(image, 1)
        _, jpeg = cv2.imencode('.jpg', frame_flip)
        return (jpeg.tobytes(), cnt)

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()

def gen(camera):
    cnt = 0
    while True:        
        frame, cnt = camera.get_frame(cnt)
        #print('이거 호출 한번??') 
        yield(b'--frame\r\n'
              b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@gzip.gzip_page
def detectme(request, workout, user_id):
    try:
        global pos 
        pos = workout
        cam = VideoCamera()
        return StreamingHttpResponse(gen(cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        print("에러입니다...")
        pass

video_capture = cv2.VideoCapture(0)