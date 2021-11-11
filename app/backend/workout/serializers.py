from rest_framework import serializers
from .models import workoutInfo, dayHistory

from post import models as user_model

class workoutInfoSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = workoutInfo

class dayHistorySerializer(serializers.ModelSerializer):
    workout_id = workoutInfoSerializer(read_only=True)
    class Meta:
        fields = '__all__'
        model = dayHistory


# class workoutHistorySerializer(serializers.ModelSerializer):
#     workout_id = workoutInfoSerializer(read_only=True)
#     workout_date = userDayInfoSerializer(read_only=True)

#     class Meta:
#         fields = '__all__'
#         model = workoutHistory



