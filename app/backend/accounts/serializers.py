from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = User

# class testResultSerializer(serializers.ModelSerializer):
#     class Meta:
#         fields = '__all__'
#         model = User