from django.contrib.auth.models import AbstractUser
from django.db import models

#사용자 정보 관리
class User(AbstractUser):
    name = models.CharField(max_length=200)
    email = models.CharField(max_length=200)
    gender =  models.CharField(max_length=200)
    birth = models.DateField(null=True, blank=True)
    height = models.FloatField(null=True, blank=True)
    weight = models.FloatField(null=True, blank=True)

    first_name = None
    last_name = None
    def __str__(self):
        return self.username;

#체력 평가 이후 생성 : 이미 있다면 routine 제외하고, 없다면 모두 update
#사용자의 운동 루틴 순서 관리
class UserWorkoutRoutine(models.Model):
    user_id = models.ForeignKey(User, 
                        on_delete=models.CASCADE,
                        related_name='user_workout_routine')
    workout_routine = models.IntegerField(null=True, blank=True)
    triceps_seq = models.IntegerField(null=True, blank=True)
    biceps_seq = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return str(self.user_id);

# 사용자의 운동별 무게, 피드백 정보를 관리
class UserWorkoutInfo(models.Model):
    user_id = models.ForeignKey(User, 
                        on_delete=models.CASCADE,
                        related_name='user_workout_info_user')
    workout_name = models.ForeignKey('workout.WorkoutInfo', 
                            on_delete=models.CASCADE,                            
                            related_name='user_workout_info_workoutname')                   
    target_kg = models.IntegerField(null=True, blank=True)
    target_cnt = models.IntegerField(null=True, blank=True)
    target_time = models.TimeField(null=True, blank=True)
    workout_feedback = models.IntegerField(null=True, blank=True)   #0: 적절, 1: 쉬움, 2: 무거움
    last_update_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return str(f'{self.user_id}_{self.workout_name}');

#체력 평가 결과를 기록
class UserTestResult(models.Model):
    user_id = models.ForeignKey(User, 
                        on_delete=models.CASCADE,
                        related_name='user_test_result')
    create_date = models.DateField(auto_now=True)
    upperbody_strength = models.IntegerField(null=True, blank=True)
    pushup_cnt = models.IntegerField(null=True, blank=True)
    stomach_strength = models.IntegerField(null=True, blank=True)
    situp_cnt = models.IntegerField(null=True, blank=True)
    lowerbody_strength = models.IntegerField(null=True, blank=True)
    squat_cnt = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return f'{self.user_id}_{self.create_date}_체력평가결과';


#해당 날짜에 사용자의 몸무게, BMI 정보
class DayHistoryUserInfo(models.Model):
    user_id = models.ForeignKey(User, 
                                on_delete=models.CASCADE,
                                related_name='day_history_user_info')
    weight = models.FloatField(null=True, blank=True)
    bmi = models.FloatField(null=True, blank=True)
    create_date = models.DateField()

    def __str__(self):
        return f'{self.user_id}_{self.create_date} 정보';