from django.urls import path

from . import views

urlpatterns = [
    #path('', views.testAPIView.as_view()),
    #path('startWorkout/<str:workout>/<int:user_id>', views.testAPIView.as_view()),
    path('startWorkout/<str:workout>/<int:user_id>', views.detectme),
]