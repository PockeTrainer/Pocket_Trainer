from rest_framework import serializers
from .models import WorkoutInfo, DayHistoryWorkout

from accounts import models as user_model

class workoutInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = WorkoutInfo

class DayHistorySerializer(serializers.ModelSerializer):
    workout_name = workoutInfoSerializer(read_only=True)
    class Meta:
        fields = '__all__'
        model = DayHistoryWorkout


# class workoutHistorySerializer(serializers.ModelSerializer):
#     workout_id = workoutInfoSerializer(read_only=True)
#     workout_date = userDayInfoSerializer(read_only=True)

#     class Meta:
#         fields = '__all__'
#         model = workoutHistory
