from django.contrib.auth.models import Permission

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import User, DayHistoryUserInfo
from .serializers import UserSerializer

from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.

class SignUpView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        #user를 create 해당 값 넣은 다음 다음 저장
        users = User.objects.all()
        if users.filter(username = request.data['id']).exists() :
            return Response({"error":"이미 존재하는 아이디입니다"}, status=400)
        try :
            user = User.objects.create_user(
                    username=request.data['id'], 
                    password=request.data['password'],
                    name=request.data['name'],
                    gender=request.data['gender'],
                    email=request.data['email'],
                    birth=request.data['birth'],
                )

            user.save()
            
            token = Token.objects.create(user=user)
            return Response({
                "code" : "200",
                "message": "회원가입완료", 
                "token": token.key
            })
        except :
            return Response({"error":"모두 입력해주세요"}, status=400)


class LogInView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        # print(request.user)
        
        user = authenticate(username=request.data['id'], password=request.data['password'])
        if user is not None:
            q = User.objects.get(username=request.data['id'])
            serializer = UserSerializer(q)

            token = Token.objects.get(user=user)
            return Response({
                "code" : 200,
                "User": serializer.data,
                "message": "로그인완료",
                "Token": token.key
            })
        else:
            return Response({"error":"존재하지 않는 ID 이거나 PassWord입니다"}, status=400)


class BeginningUserInfoView(APIView):
    #authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    def post(self, request, user_id):
        user = User.objects.get(id=user_id)
        user.height = request.data['height']
        user.weight = request.data['weight']
        user.save()
        return Response({
                "code" : 200,
                "message": "유저 초기 키, 몸무게 설정 완료",
            })


class DayUserInfoView(APIView):
    #authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    def post(self, request, date, user_id):
        user = User.objects.get(id=user_id)
        height = user.height
        user.weight = request.data['weight']    #유저 weight 변경

        bmi = round(float(request.data['weight']) / ((height/100)*(height/100)), 1)
        user_info, created = DayHistoryUserInfo.objects.update_or_create(user_id=user, create_date=date)
        user_info.weight = request.data['weight']
        user_info.bmi = bmi
        
        user_info.save()
        user.save()

        return Response({
                "code" : 200,
                "message": "몸무게, BMI 정보 저장 완료",
            })


# class TestResultAPIView(APIView):
#     # authentication_classes = [TokenAuthentication]
#     # permission_classes = [IsAuthenticated]
#     permission_classes = [AllowAny]
#     def put(self, request):
#         #user = User.objects.get(id=user_id)
#         print(request.user)
#         print(request.auth)
#         #user = User.objects.get(username="ssar")
#         user = User.objects.get(username=request.user)

#         # 남자 pushUp 등급
#         if (user.gender == "man") :
#             if (user.age <= 25) :
#                 if (int(request.data.get('pushUp')) >= 72) :
#                     user.upperBodyStrength = 1
#                 elif (64 <= int(request.data.get('pushUp')) <= 71) :
#                     user.upperBodyStrength = 2
#                 elif (56 <= int(request.data.get('pushUp')) <= 63) :
#                     user.upperBodyStrength = 3
#                 elif (48 <= int(request.data.get('pushUp')) <= 55) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5
                
#             elif (26 <= user.age <= 30) :
#                 if (int(request.data.get('pushUp')) >= 70) :
#                     user.upperBodyStrength = 1
#                 elif (62 <= int(request.data.get('pushUp')) <= 69) :
#                     user.upperBodyStrength = 2
#                 elif (54 <= int(request.data.get('pushUp')) <= 61) :
#                     user.upperBodyStrength = 3
#                 elif (46 <= int(request.data.get('pushUp')) <= 53) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5

#             elif (31 <= user.age <= 35) :
#                 if (int(request.data.get('pushUp')) >= 68) :
#                     user.upperBodyStrength = 1
#                 elif (60 <= int(request.data.get('pushUp')) <= 67) :
#                     user.upperBodyStrength = 2
#                 elif (52 <= int(request.data.get('pushUp')) <= 59) :
#                     user.upperBodyStrength = 3
#                 elif (44 <= int(request.data.get('pushUp')) <= 51) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5
            
#             elif (36 <= user.age <= 40) :
#                 if (int(request.data.get('pushUp')) >= 65) :
#                     user.upperBodyStrength = 1
#                 elif (57 <= int(request.data.get('pushUp')) <= 64) :
#                     user.upperBodyStrength = 2
#                 elif (49 <= int(request.data.get('pushUp')) <= 56) :
#                     user.upperBodyStrength = 3
#                 elif (41 <= int(request.data.get('pushUp')) <= 48) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5

#             elif (41 <= user.age <= 43) :
#                 if (int(request.data.get('pushUp')) >= 61) :
#                     user.upperBodyStrength = 1
#                 elif (53 <= int(request.data.get('pushUp')) <= 60) :
#                     user.upperBodyStrength = 2
#                 elif (45 <= int(request.data.get('pushUp')) <= 52) :
#                     user.upperBodyStrength = 3
#                 elif (37 <= int(request.data.get('pushUp')) <= 44) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5
            
#             elif (44 <= user.age <= 46) :
#                 if (int(request.data.get('pushUp')) >= 57) :
#                     user.upperBodyStrength = 1
#                 elif (49 <= int(request.data.get('pushUp')) <= 56) :
#                     user.upperBodyStrength = 2
#                 elif (41 <= int(request.data.get('pushUp')) <= 48) :
#                     user.upperBodyStrength = 3
#                 elif (33 <= int(request.data.get('pushUp')) <= 40) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5

#             elif (47 <= user.age <= 49) :
#                 if (int(request.data.get('pushUp')) >= 54) :
#                     user.upperBodyStrength = 1
#                 elif (46 <= int(request.data.get('pushUp')) <= 53) :
#                     user.upperBodyStrength = 2
#                 elif (38 <= int(request.data.get('pushUp')) <= 45) :
#                     user.upperBodyStrength = 3
#                 elif (30 <= int(request.data.get('pushUp')) <= 37) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5

#             elif (50 <= user.age <= 51) :
#                 if (int(request.data.get('pushUp')) >= 51) :
#                     user.upperBodyStrength = 1
#                 elif (43 <= int(request.data.get('pushUp')) <= 50) :
#                     user.upperBodyStrength = 2
#                 elif (35 <= int(request.data.get('pushUp')) <= 42) :
#                     user.upperBodyStrength = 3
#                 elif (27 <= int(request.data.get('pushUp')) <= 34) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5
            
#             elif (52 <= user.age <= 53) :
#                 if (int(request.data.get('pushUp')) >= 49) :
#                     user.upperBodyStrength = 1
#                 elif (41 <= int(request.data.get('pushUp')) <= 48) :
#                     user.upperBodyStrength = 2
#                 elif (33 <= int(request.data.get('pushUp')) <= 40) :
#                     user.upperBodyStrength = 3
#                 elif (25 <= int(request.data.get('pushUp')) <= 32) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5

#             elif (54 <= user.age) :
#                 if (int(request.data.get('pushUp')) >= 47) :
#                     user.upperBodyStrength = 1
#                 elif (39 <= int(request.data.get('pushUp')) <= 46) :
#                     user.upperBodyStrength = 2
#                 elif (31 <= int(request.data.get('pushUp')) <= 38) :
#                     user.upperBodyStrength = 3
#                 elif (23 <= int(request.data.get('pushUp')) <= 30) :
#                     user.upperBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5
        
#         # 남자 윗몸 등급
#         if ("man" in user.gender) :
#             if (25 >= user.age) :
#                 if (int(request.data.get('sitUp')) >= 82) :
#                     user.stomachStrength = 1
#                 elif (74 <= int(request.data.get('sitUp')) <= 81) :
#                     user.stomachStrength = 2
#                 elif (66 <= int(request.data.get('sitUp')) <= 73) :
#                     user.stomachStrength = 3
#                 elif (58 <= int(request.data.get('sitUp')) <= 65) :
#                     user.stomachStrength = 4
#                 else :
#                     user.stomachStrength = 5

#             if (26 <= user.age <= 40) :
#                 if (int(request.data.get('sitUp')) >= 72) :
#                     user.stomachStrength = 1
#                 elif (64 <= int(request.data.get('sitUp')) <= 71) :
#                     user.stomachStrength = 2
#                 elif (56 <= int(request.data.get('sitUp')) <= 63) :
#                     user.stomachStrength = 3
#                 elif (48 <= int(request.data.get('sitUp')) <= 55) :
#                     user.stomachStrength = 4
#                 else :
#                     user.stomachStrength = 5
            
#             if (41 <= user.age) :
#                 if (int(request.data.get('sitUp')) >= 54) :
#                     user.stomachStrength = 1
#                 elif (46 <= int(request.data.get('sitUp')) <= 53) :
#                     user.stomachStrength = 2
#                 elif (38 <= int(request.data.get('sitUp')) <= 45) :
#                     user.stomachStrength = 3
#                 elif (30 <= int(request.data.get('sitUp')) <= 37) :
#                     user.stomachStrength = 4
#                 else :
#                     user.stomachStrength = 5

#         # 남자 스쿼트 등급
#         if ("man" in user.gender) :
#             if (25 >= user.age) :
#                 if (int(request.data.get('squart')) >= 82) :
#                     user.lowerBodyStrength = 1
#                 elif (74 <= int(request.data.get('squart')) <= 81) :
#                     user.lowerBodyStrength = 2
#                 elif (66 <= int(request.data.get('squart')) <= 73) :
#                     user.lowerBodyStrength = 3
#                 elif (58 <= int(request.data.get('squart')) <= 65) :
#                     user.lowerBodyStrength = 4
#                 else :
#                     user.lowerBodyStrength = 5

#             if (26 <= user.age <= 40) :
#                 if (int(request.data.get('squart')) >= 72) :
#                     user.lowerBodyStrength = 1
#                 elif (64 <= int(request.data.get('squart')) <= 71) :
#                     user.lowerBodyStrength = 2
#                 elif (56 <= int(request.data.get('squart')) <= 63) :
#                     user.lowerBodyStrength = 3
#                 elif (48 <= int(request.data.get('squart')) <= 55) :
#                     user.lowerBodyStrength = 4
#                 else :
#                     user.upperBodyStrength = 5
            
#             if (41 <= user.age) :
#                 if (int(request.data.get('squart')) >= 54) :
#                     user.lowerBodyStrength = 1
#                 elif (46 <= int(request.data.get('squart')) <= 53) :
#                     user.lowerBodyStrength = 2
#                 elif (38 <= int(request.data.get('squart')) <= 45) :
#                     user.lowerBodyStrength = 3
#                 elif (30 <= int(request.data.get('squart')) <= 37) :
#                     user.lowerBodyStrength = 4
#                 else :
#                     user.lowerBodyStrength = 5

#         user.save()

#         serializer = testResultSerializer(user)
#         return Response(serializer.data)