
from typing import AsyncGenerator
from django.shortcuts import render
#generics

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from accounts.models import User, UserTestResult, UserWorkoutInfo, UserWorkoutRoutine
from .models import DayHistoryWorkout, WorkoutInfo
from .serializers import DayHistorySerializer

from rest_framework.permissions import AllowAny, IsAuthenticated

from datetime import datetime

class CreateRoutineView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, user_id):
        user = User.objects.get(id=user_id)

        date = datetime.now().date()
        DayHistory_Workout = DayHistoryWorkout.objects.filter(user_id = user, create_date=date)
        
        try:
            #해당일 계획 존재 하지 않을 때 운동루틴 레벨에 맞게 계획 세우기
            if len(DayHistory_Workout) == 0 :
                try:
                    User_WorkoutRoutine = UserWorkoutRoutine.objects.get(user_id = user)
                except UserWorkoutRoutine.DoesNotExist:
                    return Response({"error":"오늘의 운동 루틴 생성 실패, 체력평가 결과 필요"}, status=400)
                todayRoutine = User_WorkoutRoutine.workout_routine
                
                # row 추가 code
                if (todayRoutine == 0) :
                    # 가슴 운동
                    Workout_Info = WorkoutInfo.objects.get(workout_name="bench_press")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    Workout_Info = WorkoutInfo.objects.get(workout_name="incline_press")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    Workout_Info = WorkoutInfo.objects.get(workout_name="pec_dec_fly")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    #삼두 운동
                    triceps_seq = User_WorkoutRoutine.triceps_seq  #삼두 순서
                    if triceps_seq == 0:
                        workout = "cable_push_down"
                    elif triceps_seq == 1:
                        workout = "lying_triceps_extension"
                    elif triceps_seq == 2:
                        workout = "dumbbell_kickback"

                    Workout_Info = WorkoutInfo.objects.get(workout_name=workout)
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    #복부 운동
                    Workout_Info = WorkoutInfo.objects.get(workout_name="crunch")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_cnt
                    created_DayHistory_Workout.save()

                elif (todayRoutine == 1) :
                    # 등 운동
                    Workout_Info = WorkoutInfo.objects.get(workout_name="lat_pull_down")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    Workout_Info = WorkoutInfo.objects.get(workout_name="city_draw")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    Workout_Info = WorkoutInfo.objects.get(workout_name="one_arm_dumbbell_row")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    # 이두 운동
                    biceps_seq = User_WorkoutRoutine.biceps_seq  #이두 순서
                    if biceps_seq == 0:
                        workout = "easy_bar_curl"
                    elif biceps_seq == 1:
                        workout = "barbell_curl"
                    elif biceps_seq == 2:
                        workout = "hammer_curl"

                    Workout_Info = WorkoutInfo.objects.get(workout_name=workout)
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    # 복부 운동
                    Workout_Info = WorkoutInfo.objects.get(workout_name="city_dennis_up")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_cnt = User_WorkoutInfo.target_cnt
                    created_DayHistory_Workout.save()

                else:
                    # 어깨 운동
                    Workout_Info = WorkoutInfo.objects.get(workout_name="dumbbell_shoulder_press")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()


                    Workout_Info = WorkoutInfo.objects.get(workout_name="side_lateral_raise")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()


                    Workout_Info = WorkoutInfo.objects.get(workout_name="reverse_peck_deck_fly")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    # 하체 운동
                    Workout_Info = WorkoutInfo.objects.get(workout_name="squat")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()


                    Workout_Info = WorkoutInfo.objects.get(workout_name="leg_press")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()


                    Workout_Info = WorkoutInfo.objects.get(workout_name="leg_extension")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_kg = User_WorkoutInfo.target_kg
                    created_DayHistory_Workout.save()

                    # 복부 운동
                    Workout_Info = WorkoutInfo.objects.get(workout_name="plank")
                    User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id = user, workout_name = Workout_Info)

                    created_DayHistory_Workout = DayHistoryWorkout.objects.create(user_id=user, create_date=date, workout_name=Workout_Info)
                    created_DayHistory_Workout.target_time = User_WorkoutInfo.target_time
                    created_DayHistory_Workout.save()
                
                return Response({
                        "code" : "200",
                        "message" : "workout row 생성 완료",
                    })
            else:
                return Response({"error":"오늘의 운동 계획이 이미 생성되었습니다"}, status=400)
        except:
            return Response({"error":"workout row 생성 실패."}, status=400)

#제일 최근 평가 기록 가져오기
class LastTestResultView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, user_id):

        user = User.objects.get(id=user_id)

        try:
            UserTest_Result = UserTestResult.objects.filter(user_id=user).last()

            upperbody_strength = UserTest_Result.upperbody_strength
            stomach_strength = UserTest_Result.stomach_strength
            lowerbody_strength = UserTest_Result.lowerbody_strength
            pushup_cnt = UserTest_Result.pushup_cnt
            situp_cnt = UserTest_Result.situp_cnt
            squat_cnt = UserTest_Result.squat_cnt
            date = UserTest_Result.create_date

            return Response({
                    "code" : "200",
                    "message" : "최근 평가 기록 확인 완료",
                    "upperbody_strength" : upperbody_strength,
                    "stomach_strength" : stomach_strength,
                    "lowerbody_strength" : lowerbody_strength,
                    "pushup_cnt" : pushup_cnt,
                    "situp_cnt" : situp_cnt,
                    "squat_cnt" : squat_cnt,
                    "date" : date
                })
        except:
            return Response({"error":"최근 평가 기록이 존재하지 않습니다."}, status=400)


#체력측정 기록 저장
class SaveTestResultView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, user_id):
        user = User.objects.get(id=user_id)

        today = datetime.now().date()
        age = today.year - user.birth.year
        if today.month < user.birth.month or (today.month == user.birth.month and today.day < user.birth.day) : 
            age -= 1
        
        #try:
        User_TestResult = UserTestResult.objects.create(user_id = user)
        
        User_TestResult.pushup_cnt = request.data['pushUp']
        User_TestResult.situp_cnt = request.data['sitUp']
        User_TestResult.squat_cnt = request.data['squat']
        
        # 남자 pushUp 등급
        if ("man" in user.gender) :
            if (age <= 25) :
                if (int(request.data.get('pushUp')) >= 72) :
                    User_TestResult.upperbody_strength = 1
                elif (64 <= int(request.data.get('pushUp')) <= 71) :
                    User_TestResult.upperbody_strength = 2
                elif (56 <= int(request.data.get('pushUp')) <= 63) :
                    User_TestResult.upperbody_strength = 3
                elif (48 <= int(request.data.get('pushUp')) <= 55) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5
                
            elif (26 <= age <= 30) :
                if (int(request.data.get('pushUp')) >= 70) :
                    User_TestResult.upperbody_strength = 1
                elif (62 <= int(request.data.get('pushUp')) <= 69) :
                    User_TestResult.upperbody_strength = 2
                elif (54 <= int(request.data.get('pushUp')) <= 61) :
                    User_TestResult.upperbody_strength = 3
                elif (46 <= int(request.data.get('pushUp')) <= 53) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5

            elif (31 <= age <= 35) :
                if (int(request.data.get('pushUp')) >= 68) :
                    User_TestResult.upperbody_strength = 1
                elif (60 <= int(request.data.get('pushUp')) <= 67) :
                    User_TestResult.upperbody_strength = 2
                elif (52 <= int(request.data.get('pushUp')) <= 59) :
                    User_TestResult.upperbody_strength = 3
                elif (44 <= int(request.data.get('pushUp')) <= 51) :
                    User_TestResult.upperbody_strengthh = 4
                else :
                    User_TestResult.upperbody_strength = 5
            
            elif (36 <= age <= 40) :
                if (int(request.data.get('pushUp')) >= 65) :
                    User_TestResult.upperbody_strength = 1
                elif (57 <= int(request.data.get('pushUp')) <= 64) :
                    User_TestResult.upperbody_strength = 2
                elif (49 <= int(request.data.get('pushUp')) <= 56) :
                    User_TestResult.upperbody_strength = 3
                elif (41 <= int(request.data.get('pushUp')) <= 48) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5

            elif (41 <= age <= 43) :
                if (int(request.data.get('pushUp')) >= 61) :
                    User_TestResult.upperbody_strength = 1
                elif (53 <= int(request.data.get('pushUp')) <= 60) :
                    User_TestResult.upperbody_strength = 2
                elif (45 <= int(request.data.get('pushUp')) <= 52) :
                    User_TestResult.upperbody_strength = 3
                elif (37 <= int(request.data.get('pushUp')) <= 44) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5
            
            elif (44 <= age <= 46) :
                if (int(request.data.get('pushUp')) >= 57) :
                    User_TestResult.upperbody_strength = 1
                elif (49 <= int(request.data.get('pushUp')) <= 56) :
                    User_TestResult.upperbody_strength = 2
                elif (41 <= int(request.data.get('pushUp')) <= 48) :
                    User_TestResult.upperbody_strength = 3
                elif (33 <= int(request.data.get('pushUp')) <= 40) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5

            elif (47 <= age <= 49) :
                if (int(request.data.get('pushUp')) >= 54) :
                    User_TestResult.upperbody_strength = 1
                elif (46 <= int(request.data.get('pushUp')) <= 53) :
                    User_TestResult.upperbody_strength = 2
                elif (38 <= int(request.data.get('pushUp')) <= 45) :
                    User_TestResult.upperbody_strength = 3
                elif (30 <= int(request.data.get('pushUp')) <= 37) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5

            elif (50 <= age <= 51) :
                if (int(request.data.get('pushUp')) >= 51) :
                    User_TestResult.upperbody_strength = 1
                elif (43 <= int(request.data.get('pushUp')) <= 50) :
                    User_TestResult.upperbody_strength = 2
                elif (35 <= int(request.data.get('pushUp')) <= 42) :
                    User_TestResult.upperbody_strength = 3
                elif (27 <= int(request.data.get('pushUp')) <= 34) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5
            
            elif (52 <= age <= 53) :
                if (int(request.data.get('pushUp')) >= 49) :
                    User_TestResult.upperbody_strength = 1
                elif (41 <= int(request.data.get('pushUp')) <= 48) :
                    User_TestResult.upperbody_strength = 2
                elif (33 <= int(request.data.get('pushUp')) <= 40) :
                    User_TestResult.upperbody_strength = 3
                elif (25 <= int(request.data.get('pushUp')) <= 32) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5

            elif (54 <= age) :
                if (int(request.data.get('pushUp')) >= 47) :
                    User_TestResult.upperbody_strength = 1
                elif (39 <= int(request.data.get('pushUp')) <= 46) :
                    User_TestResult.upperbody_strength = 2
                elif (31 <= int(request.data.get('pushUp')) <= 38) :
                    User_TestResult.upperbody_strength = 3
                elif (23 <= int(request.data.get('pushUp')) <= 30) :
                    User_TestResult.upperbody_strength = 4
                else :
                    User_TestResult.upperbody_strength = 5
        
        # 남자 윗몸 등급
        if ("man" in user.gender) :
            if (25 >= age) :
                if (int(request.data.get('sitUp')) >= 82) :
                    User_TestResult.stomach_strength = 1
                elif (74 <= int(request.data.get('sitUp')) <= 81) :
                    User_TestResult.stomach_strength = 2
                elif (66 <= int(request.data.get('sitUp')) <= 73) :
                    User_TestResult.stomach_strength = 3
                elif (58 <= int(request.data.get('sitUp')) <= 65) :
                    User_TestResult.stomach_strength = 4
                else :
                    User_TestResult.stomach_strength = 5

            if (26 <= age <= 40) :
                if (int(request.data.get('sitUp')) >= 72) :
                    User_TestResult.stomach_strength = 1
                elif (64 <= int(request.data.get('sitUp')) <= 71) :
                    User_TestResult.stomach_strength = 2
                elif (56 <= int(request.data.get('sitUp')) <= 63) :
                    User_TestResult.stomach_strength = 3
                elif (48 <= int(request.data.get('sitUp')) <= 55) :
                    User_TestResult.stomach_strength = 4
                else :
                    User_TestResult.stomach_strength = 5
            
            if (41 <= age) :
                if (int(request.data.get('sitUp')) >= 54) :
                    User_TestResult.stomach_strength = 1
                elif (46 <= int(request.data.get('sitUp')) <= 53) :
                    User_TestResult.stomach_strength = 2
                elif (38 <= int(request.data.get('sitUp')) <= 45) :
                    User_TestResult.stomach_strength = 3
                elif (30 <= int(request.data.get('sitUp')) <= 37) :
                    User_TestResult.stomach_strength = 4
                else :
                    User_TestResult.stomach_strength = 5

        # 남자 스쿼트 등급
        if ("man" in user.gender) :
            if (25 >= age) :
                if (int(request.data.get('squat')) >= 82) :
                    User_TestResult.lowerbody_strength = 1
                elif (74 <= int(request.data.get('squat')) <= 81) :
                    User_TestResult.lowerbody_strength = 2
                elif (66 <= int(request.data.get('squat')) <= 73) :
                    User_TestResult.lowerbody_strength = 3
                elif (58 <= int(request.data.get('squat')) <= 65) :
                    User_TestResult.lowerbody_strength = 4
                else :
                    User_TestResult.lowerbody_strength = 5

            if (26 <= age <= 40) :
                if (int(request.data.get('squat')) >= 72) :
                    User_TestResult.lowerbody_strength = 1
                elif (64 <= int(request.data.get('squat')) <= 71) :
                    User_TestResult.lowerbody_strength = 2
                elif (56 <= int(request.data.get('squat')) <= 63) :
                    User_TestResult.lowerbody_strength = 3
                elif (48 <= int(request.data.get('squat')) <= 55) :
                    User_TestResult.lowerbody_strength = 4
                else :
                    User_TestResult.lowerbody_strength = 5
            
            if (41 <= age) :
                if (int(request.data.get('squat')) >= 54) :
                    User_TestResult.lowerbody_strength = 1
                elif (46 <= int(request.data.get('squat')) <= 53) :
                    User_TestResult.lowerbody_strength = 2
                elif (38 <= int(request.data.get('squat')) <= 45) :
                    User_TestResult.lowerbody_strength = 3
                elif (30 <= int(request.data.get('squat')) <= 37) :
                    User_TestResult.lowerbody_strength = 4
                else :
                    User_TestResult.lowerbody_strength = 5
        
        User_TestResult.save()

        #UserWorkoutInfo 테이블 update or create (운동 루틴, 각 운동별 무게 추천)
        #등급으로 각 운동별 추천 무게 설정
        kg = 0
        cnt = 0
        time = "00:00:00"

        # 가슴
        Workout_Info = WorkoutInfo.objects.get(workout_name="bench_press")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()
        
        Workout_Info = WorkoutInfo.objects.get(workout_name="incline_press")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="pec_dec_fly")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        # 등
        Workout_Info = WorkoutInfo.objects.get(workout_name="lat_pull_down")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="city_draw")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="one_arm_dumbbell_row")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        # 어깨
        Workout_Info = WorkoutInfo.objects.get(workout_name="dumbbell_shoulder_press")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="side_lateral_raise")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="reverse_peck_deck_fly")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        # 삼두
        Workout_Info = WorkoutInfo.objects.get(workout_name="cable_push_down")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="lying_triceps_extension")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="dumbbell_kickback")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        # 이두
        Workout_Info = WorkoutInfo.objects.get(workout_name="easy_bar_curl")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="barbell_curl")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()
        
        Workout_Info = WorkoutInfo.objects.get(workout_name="hammer_curl")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save() 

        # 복부
        Workout_Info = WorkoutInfo.objects.get(workout_name="crunch")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_cnt = cnt
        User_WorkoutInfo.save()          

        Workout_Info = WorkoutInfo.objects.get(workout_name="city_dennis_up")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_cnt = cnt
        User_WorkoutInfo.save() 

        Workout_Info = WorkoutInfo.objects.get(workout_name="plank")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_time = time 
        User_WorkoutInfo.save() 

        # 하체
        Workout_Info = WorkoutInfo.objects.get(workout_name="squat")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()

        Workout_Info = WorkoutInfo.objects.get(workout_name="leg_press")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save()
        
        Workout_Info = WorkoutInfo.objects.get(workout_name="leg_extension")
        User_WorkoutInfo, created = UserWorkoutInfo.objects.update_or_create(user_id = user, workout_name = Workout_Info)
        User_WorkoutInfo.target_kg = kg
        User_WorkoutInfo.save() 
        
        if created:
            UserWorkoutRoutine.objects.create(
                user_id= user, 
                workout_routine = 0,
                triceps_seq = 0,
                biceps_seq = 0
            )

        return Response({
                "code" : 200,
                "message" : "체력평가 기록 저장 완료"
            })
        #except:
        #    return Response({"error":"체력평가 기록 저장 실패."}, status=400)

#오늘의 루틴 정보 호출
class TodayRoutineView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)

            #오늘의 루틴 기록
            today = datetime.now().date()
            DayHistory_Workout_q = DayHistoryWorkout.objects.filter(user_id=user, create_date=today)
            DayHistory_Serializer = DayHistorySerializer(DayHistory_Workout_q, many=True)
            return Response({
                        "code" : 200,
                        "message" : "오늘의 루틴 페이지 정보 호출 완료",
                        "todayRoutine" : DayHistory_Serializer.data
                    })
        except:
            return Response({"error":"오늘의 루틴 페이지 정보 호출 실패."}, status=400)

#운동측정 전 무게 or 갯수 or 시간 호출 
class GetUserWorkoutInfo(APIView):
    permission_classes = [AllowAny]
    def get(self, request, workout, user_id):
        is_first = False    #해당 운동 처음 하는지(무게 추천)
        try:
            user = User.objects.get(id=user_id)
            workout = WorkoutInfo.objects.get(workout_name=workout)

            User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id=user, workout_name=workout)

            #이전에 해당 운동 무게 측정x 상태
            if(User_WorkoutInfo.workout_feedback == None) :
                is_first = True

            User_WorkoutInfo.save()

            return Response({
                        "code" : 200,
                        "message" : "유저 운동정보 호출 완료",
                        "is_first" : is_first,
                        "target_kg" : User_WorkoutInfo.target_kg,
                        "target_cnt" : User_WorkoutInfo.target_cnt,
                        "target_time" : User_WorkoutInfo.target_time,
                        "workout_feedback" : User_WorkoutInfo.workout_feedback,
                    })
        except:
            return Response({"error" : "유저 운동정보 호출 실패"}, status=400)


#운동측정 전 무게 or 갯수 or 시간 조절 
class ChangeUserWorkoutInfo(APIView):
    permission_classes = [AllowAny]
    def put(self, request, workout, user_id):
        try:
            user = User.objects.get(id=user_id)
            workout = WorkoutInfo.objects.get(workout_name=workout)

            User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id=user, workout_name=workout)

            if(request.data['target_kg']) :
                User_WorkoutInfo.target_kg = request.data['target_kg']
            elif(request.data['target_cnt']) :
                User_WorkoutInfo.target_cnt = request.data['target_cnt']
            elif(request.data['target_time']) :
                User_WorkoutInfo.target_time = request.data['target_time']

            User_WorkoutInfo.workout_feedback = 0

            User_WorkoutInfo.save()

            return Response({
                        "code" : 200,
                        "message" : "유저 운동정보 변경 완료",
                    })
        except:
            return Response({"error" : "유저 운동정보 변경 실패"}, status=400)

#운동측정 기록 update
class WorkoutResultView(APIView):
    permission_classes = [AllowAny]
    def put(self, request, workout, user_id):
        try:
            user = User.objects.get(id=user_id)
            workout = WorkoutInfo.objects.get(workout_name=workout)

            today = datetime.now().date()
            DayHistory_Workout = DayHistoryWorkout.objects.get(user_id=user, create_date=today, workout_name=workout)
            DayHistory_Workout.workout_set = request.data['workout_set']
            DayHistory_Workout.workout_cnt = request.data['workout_cnt']
            DayHistory_Workout.workout_time = request.data['workout_time']
            
            DayHistory_Workout.save()

            return Response({
                        "code" : 200,
                        "message" : "운동 기록 저장 완료",
                    })
        except:
            return Response({"error" : "운동 기록 저장 실패"}, status=400)

#운동측정 후 피드백 반영
class WorkoutFeedbackView(APIView):
    permission_classes = [AllowAny]
    def put(self, request, workout, user_id):
        try:
            user = User.objects.get(id=user_id)
            workout = WorkoutInfo.objects.get(workout_name=workout)

            User_WorkoutInfo = UserWorkoutInfo.objects.get(user_id=user, workout_name=workout)
            User_WorkoutInfo.workout_feedback = request.data['feedback']
            User_WorkoutInfo.save()

            return Response({
                        "code" : 200,
                        "message" : "feedback 반영 완료",
                    })
        except:
            return Response({"error" : "feedback 반영 실패"}, status=400)
