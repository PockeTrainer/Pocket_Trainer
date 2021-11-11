from rest_framework import serializers
from .models import Post, User

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'title',
            'content',
        )
        model = Post

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        fields = (
            'id',
            'name',
            'bodyType',
        )
        model = User

class testResultSerializer(serializers.ModelSerializer):
    class Meta:
        fields = '__all__'
        model = User