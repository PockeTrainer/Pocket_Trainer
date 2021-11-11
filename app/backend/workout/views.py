from django.shortcuts import render
#generics
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import dayHistory, workoutInfo
from .serializers import dayHistorySerializer

class pushUpAPIView(APIView):
    def get(self, request, user_id):
        data = {"count":7}
        return Response(data)

class dayHistoryAPIView(APIView):
    # def get_queryset(self):
    #     serializer_class = workoutHistorySerializer
    #     us_id = self.kwargs['user_id']
    #     return workoutHistory.objects.filter(user_id=us_id)

    def get(self, request, user_id, date):
        
        print('date : ', date)
        q = dayHistory.objects.filter(
                user_id=user_id
            ) & dayHistory.objects.filter(
                create_date = date  
                # create_date=request.data.get('date')
            )

        serializer = dayHistorySerializer(q, many=True)
        # if serializer.is_valid():
        #     #serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data)
    # def get(self, request, user_id, date):
        
    #     q = dayHistory.objects.filter(
    #             user_id=user_id
    #         ) & dayHistory.objects.filter(
    #             create_date=request.data.get('date')
    #         )

    #     serializer = dayHistorySerializer(q, many=True)
    #     # if serializer.is_valid():
    #     #     #serializer.save()
    #     #     return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED)


# class sendWorkoutInfo(APIView):
#     def get(self, request):
#         q = workoutInfo.objects.all()
#         serializer = workoutInfoSerializer(q, many=True)
#         return Response(serializer.data)
        
#     def post(self, request):
#         serializer = workoutInfoSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_201_CREATED)

