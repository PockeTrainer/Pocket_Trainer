from django.db import models

from accounts import models as user_model

#운동 정보
class WorkoutInfo(models.Model):
    workout_name = models.CharField(primary_key=True, max_length=200)
    workout_kcal = models.IntegerField()
    body_part = models.CharField(null=True, blank=True, max_length=200)

    def __str__(self):
        return self.workout_name

#해당 날짜에 사용자의 운동 기록 정보
class DayHistoryWorkout(models.Model):
    user_id = models.ForeignKey(user_model.User, 
                            on_delete=models.CASCADE,
                            related_name='day_history_workout_user')
    create_date = models.DateField()
    workout_name = models.ForeignKey(WorkoutInfo, 
                                on_delete=models.CASCADE,                            
                                related_name='day_history_workout_workout')
    target_kg = models.IntegerField(null=True, blank=True)
    target_cnt = models.IntegerField(null=True, blank=True)
    target_time = models.TimeField(null=True, blank=True)
    #target_set = models.IntegerField(null=True, blank=True)
    #target_cnt = models.IntegerField(null=True, blank=True)
    workout_set = models.IntegerField(null=True, blank=True)
    #workout_cnt = models.IntegerField(null=True, blank=True)
    workout_time = models.TimeField(null=True, blank=True)
    is_clear = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user_id}_{self.create_date}_{self.workout_name}_운동기록'

#해당 날짜에 사용자의 추가 운동 기록 정보
class DayHistoryExtraWorkout(models.Model):
    user_id = models.ForeignKey(user_model.User, 
                            on_delete=models.CASCADE,
                            related_name='day_history_workout')
    create_date = models.DateField()
    workout_name = models.ForeignKey(WorkoutInfo, 
                                on_delete=models.CASCADE,                            
                                related_name='day_history_workout')
    workout_kg = models.IntegerField(null=True, blank=True)
    workout_cnt = models.IntegerField(null=True, blank=True)
    workout_time = models.TimeField(null=True, blank=True)

    def __str__(self):
        return f'{self.user_id}_{self.create_date}_추가운동기록'
