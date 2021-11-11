from django.db import models
from post import models as user_model
# Create your models here.
# class userDayInfo(models.Model):
#     user_id = models.ForeignKey(user_model.User, 
#                                 on_delete=models.CASCADE)
#     weight = models.IntegerField()
#     bmi = models.IntegerField()
#     create_date = models.DateField(auto_now_add = True)

#     def __str__(self):
#         return str(self.create_date)

class workoutInfo(models.Model):
    workout_name = models.CharField(max_length=200)
    workout_kcal = models.IntegerField()

    def __str__(self):
        return self.workout_name

class dayHistory(models.Model):
    user_id = models.ForeignKey(user_model.User, 
                                on_delete=models.CASCADE,
                                related_name='workoutHistory_userid')
    workout_id = models.ForeignKey(workoutInfo, 
                                on_delete=models.CASCADE,                            
                                related_name='workoutHistory_workoutid')
    # workout_date = models.ForeignKey(userDayInfo, 
    #                             on_delete=models.CASCADE,
    #                             related_name='workoutHistory_workoutdate',
    #                             null=True,
    #                             blank=True)

    weight = models.FloatField(null=True, blank=True)
    bmi = models.FloatField(null=True, blank=True)

    total_time = models.IntegerField()
    create_date = models.DateField(auto_now_add = True)

    def __str__(self):
        return str(self.create_date)
