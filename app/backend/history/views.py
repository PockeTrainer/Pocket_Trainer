from django.shortcuts import render
#generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.models import User, DayHistoryUserInfo, UserTestResult
from workout.models import DayHistoryWorkout
#from .models import dayHistoryUserInfo, dayHistoryWorkout, workoutInfo
from accounts.serializers import UserSerializer
from workout.serializers import DayHistorySerializer

from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated

import datetime

#mainpage 정보 호출
class MainPageInfoView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, user_id):
        #try:
        user = User.objects.get(id=user_id)
        modal_seq = 0

        #오늘의 루틴 기록
        today = datetime.datetime.now().date()
        DayHistory_Workout_q = DayHistoryWorkout.objects.filter(user_id=user, create_date=today)
        DayHistory_Serializer = DayHistorySerializer(DayHistory_Workout_q, many=True)

        #최근 운동 평가 기록 -> 등급을 나타내줄 건데 나중에 수정 예정
        UserTest_Result = UserTestResult.objects.filter(user_id=user).last()
        if UserTest_Result == None:
            return Response({"error":"mainpage정보(운동) 호출 실패, 체력평가 결과 필요"}, status=400) 
        
        upperbody_strength = UserTest_Result.upperbody_strength
        stomach_strength = UserTest_Result.stomach_strength
        lowerbody_strength = UserTest_Result.lowerbody_strength
        date = UserTest_Result.create_date

        # 유저정보(체중, 키), 체력평가 여부 확인
        # modal_seq - 0: 둘다x, 1:유저정보o, 2:유저정보o, 체력평가o
        weight = user.weight
        height = user.weight
        if weight and height:
            modal_seq = 1
        if UserTest_Result != None:
            modal_seq = 2

        return Response({
            "code" : 200,
            "message" : "mainpage 정보 확인 완료",
            "modal_seq" : modal_seq,
            "todayRoutine" : DayHistory_Serializer.data,     
            # "testResult" : {
            #     "upperbody_strength" : upperbody_strength,   
            #     "stomach_strength" : stomach_strength,        
            #     "lowerbody_strength" : lowerbody_strength,
            #     "date" : date   
            # },
                #"changeGraph" : {
                #    "start_month" : start_month,    
                #    "count" : count                 
                #}

                #"today_kcal" : today_kcal
                # "dietGraph" : {
                #     "carbohydrate" : carbohydrate,    ]
                #     "protein", protein,                80]
                #     "province", province              
                # }
                
        })
        #except:
        #    return Response({"error":"mainpage 정보 호출 실패."}, status=400)


#기록 호출
class DayHistoryView(APIView):
    #authentication_classes = [TokenAuthentication]
    #permission_classes = [IsAuthenticated]
    permission_classes = [AllowAny]
    def get(self, request, date, user_id):
        #try:
        user = User.objects.get(id=user_id)
        DayHistory_UserInfo = DayHistoryUserInfo.objects.filter(user_id=user, create_date = date)

        if len(DayHistory_UserInfo) == 0:
            day_weight = -1
            day_bmi = -1
        else:    
            day_weight = DayHistory_UserInfo[0].weight
            day_bmi = DayHistory_UserInfo[0].bmi

        #오늘의 루틴 기록
        DayHistory_Workout_q = DayHistoryWorkout.objects.filter(user_id=user, create_date=date)
        DayHistory_Serializer = DayHistorySerializer(DayHistory_Workout_q, many=True)

        return Response({
                "code" : "200",
                "message" : "기록 호출 완료",
                "day_weight" : day_weight,
                "day_bmi" : day_bmi,
                "day_history_workout" : DayHistory_Serializer.data
            })
        #except:
        #     return Response({"error":"해당일 기록이 존재하지 않습니다."}, status=400)

