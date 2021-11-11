# Create your views here.
from django.shortcuts import render
from rest_framework import generics

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Post, User
from .serializers import PostSerializer, UserSerializer
from .serializers import testResultSerializer

class ListPost(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DetailPost(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class DetailUser(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class testResultAPIView(APIView):
    def put(self, request, user_id):
        user = User.objects.get(id=user_id)

        # 남자 pushUp 등급
        if (user.sex == "남자") :
            if (user.age <= 25) :
                if (int(request.data.get('pushUp')) >= 72) :
                    user.upperBodyStrength = 1
                elif (64 <= int(request.data.get('pushUp')) <= 71) :
                    user.upperBodyStrength = 2
                elif (56 <= int(request.data.get('pushUp')) <= 63) :
                    user.upperBodyStrength = 3
                elif (48 <= int(request.data.get('pushUp')) <= 55) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5
                
            elif (26 <= user.age <= 30) :
                if (int(request.data.get('pushUp')) >= 70) :
                    user.upperBodyStrength = 1
                elif (62 <= int(request.data.get('pushUp')) <= 69) :
                    user.upperBodyStrength = 2
                elif (54 <= int(request.data.get('pushUp')) <= 61) :
                    user.upperBodyStrength = 3
                elif (46 <= int(request.data.get('pushUp')) <= 53) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5

            elif (31 <= user.age <= 35) :
                if (int(request.data.get('pushUp')) >= 68) :
                    user.upperBodyStrength = 1
                elif (60 <= int(request.data.get('pushUp')) <= 67) :
                    user.upperBodyStrength = 2
                elif (52 <= int(request.data.get('pushUp')) <= 59) :
                    user.upperBodyStrength = 3
                elif (44 <= int(request.data.get('pushUp')) <= 51) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5
            
            elif (36 <= user.age <= 40) :
                if (int(request.data.get('pushUp')) >= 65) :
                    user.upperBodyStrength = 1
                elif (57 <= int(request.data.get('pushUp')) <= 64) :
                    user.upperBodyStrength = 2
                elif (49 <= int(request.data.get('pushUp')) <= 56) :
                    user.upperBodyStrength = 3
                elif (41 <= int(request.data.get('pushUp')) <= 48) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5

            elif (41 <= user.age <= 43) :
                if (int(request.data.get('pushUp')) >= 61) :
                    user.upperBodyStrength = 1
                elif (53 <= int(request.data.get('pushUp')) <= 60) :
                    user.upperBodyStrength = 2
                elif (45 <= int(request.data.get('pushUp')) <= 52) :
                    user.upperBodyStrength = 3
                elif (37 <= int(request.data.get('pushUp')) <= 44) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5
            
            elif (44 <= user.age <= 46) :
                if (int(request.data.get('pushUp')) >= 57) :
                    user.upperBodyStrength = 1
                elif (49 <= int(request.data.get('pushUp')) <= 56) :
                    user.upperBodyStrength = 2
                elif (41 <= int(request.data.get('pushUp')) <= 48) :
                    user.upperBodyStrength = 3
                elif (33 <= int(request.data.get('pushUp')) <= 40) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5

            elif (47 <= user.age <= 49) :
                if (int(request.data.get('pushUp')) >= 54) :
                    user.upperBodyStrength = 1
                elif (46 <= int(request.data.get('pushUp')) <= 53) :
                    user.upperBodyStrength = 2
                elif (38 <= int(request.data.get('pushUp')) <= 45) :
                    user.upperBodyStrength = 3
                elif (30 <= int(request.data.get('pushUp')) <= 37) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5

            elif (50 <= user.age <= 51) :
                if (int(request.data.get('pushUp')) >= 51) :
                    user.upperBodyStrength = 1
                elif (43 <= int(request.data.get('pushUp')) <= 50) :
                    user.upperBodyStrength = 2
                elif (35 <= int(request.data.get('pushUp')) <= 42) :
                    user.upperBodyStrength = 3
                elif (27 <= int(request.data.get('pushUp')) <= 34) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5
            
            elif (52 <= user.age <= 53) :
                if (int(request.data.get('pushUp')) >= 49) :
                    user.upperBodyStrength = 1
                elif (41 <= int(request.data.get('pushUp')) <= 48) :
                    user.upperBodyStrength = 2
                elif (33 <= int(request.data.get('pushUp')) <= 40) :
                    user.upperBodyStrength = 3
                elif (25 <= int(request.data.get('pushUp')) <= 32) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5

            elif (54 <= user.age) :
                if (int(request.data.get('pushUp')) >= 47) :
                    user.upperBodyStrength = 1
                elif (39 <= int(request.data.get('pushUp')) <= 46) :
                    user.upperBodyStrength = 2
                elif (31 <= int(request.data.get('pushUp')) <= 38) :
                    user.upperBodyStrength = 3
                elif (23 <= int(request.data.get('pushUp')) <= 30) :
                    user.upperBodyStrength = 4
                else :
                    user.upperBodyStrength = 5
        
        # 남자 윗몸 등급
        if (user.sex == "남자") :
            if (25 >= user.age) :
                if (int(request.data.get('sitUp')) >= 82) :
                    user.stomachStrength = 1
                elif (74 <= int(request.data.get('sitUp')) <= 81) :
                    user.stomachStrength = 2
                elif (66 <= int(request.data.get('sitUp')) <= 73) :
                    user.stomachStrength = 3
                elif (58 <= int(request.data.get('sitUp')) <= 65) :
                    user.stomachStrength = 4
                else :
                    user.stomachStrength = 5

            if (26 <= user.age <= 40) :
                if (int(request.data.get('sitUp')) >= 72) :
                    user.stomachStrength = 1
                elif (64 <= int(request.data.get('sitUp')) <= 71) :
                    user.stomachStrength = 2
                elif (56 <= int(request.data.get('sitUp')) <= 63) :
                    user.stomachStrength = 3
                elif (48 <= int(request.data.get('sitUp')) <= 55) :
                    user.stomachStrength = 4
                else :
                    user.stomachStrength = 5
            
            if (41 <= user.age) :
                if (int(request.data.get('sitUp')) >= 54) :
                    user.stomachStrength = 1
                elif (46 <= int(request.data.get('sitUp')) <= 53) :
                    user.stomachStrength = 2
                elif (38 <= int(request.data.get('sitUp')) <= 45) :
                    user.stomachStrength = 3
                elif (30 <= int(request.data.get('sitUp')) <= 37) :
                    user.stomachStrength = 4
                else :
                    user.stomachStrength = 5

        # 남자 스쿼트 등급
        if (user.sex == "남자") :
            if (25 >= user.age) :
                if (int(request.data.get('squart')) >= 82) :
                    user.lowerBodyStrength = 1
                elif (74 <= int(request.data.get('squart')) <= 81) :
                    user.lowerBodyStrength = 2
                elif (66 <= int(request.data.get('squart')) <= 73) :
                    user.lowerBodyStrength = 3
                elif (58 <= int(request.data.get('squart')) <= 65) :
                    user.lowerBodyStrength = 4
                else :
                    user.lowerBodyStrength = 5

            if (26 <= user.age <= 40) :
                if (int(request.data.get('squart')) >= 72) :
                    user.lowerBodyStrength = 1
                elif (64 <= int(request.data.get('squart')) <= 71) :
                    user.lowerBodyStrength = 2
                elif (56 <= int(request.data.get('squart')) <= 63) :
                    user.lowerBodyStrength = 3
                elif (48 <= int(request.data.get('squart')) <= 55) :
                    user.lowerBodyStrength = 4
                else :
                    user.upperBodyStrength = 5
            
            if (41 <= user.age) :
                if (int(request.data.get('squart')) >= 54) :
                    user.lowerBodyStrength = 1
                elif (46 <= int(request.data.get('squart')) <= 53) :
                    user.lowerBodyStrength = 2
                elif (38 <= int(request.data.get('squart')) <= 45) :
                    user.lowerBodyStrength = 3
                elif (30 <= int(request.data.get('squart')) <= 37) :
                    user.lowerBodyStrength = 4
                else :
                    user.lowerBodyStrength = 5

        user.save()

        serializer = testResultSerializer(user)
        return Response(serializer.data)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)