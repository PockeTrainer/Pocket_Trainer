from django.urls import path

from . import views

urlpatterns = [
    path('signup', views.SignUpView.as_view()),
    path('login', views.LogInView.as_view()),
    #path('testResult', views.TestResultAPIView.as_view()),
    path('userInfo/<int:user_id>', views.BeginningUserInfoView.as_view()),
    path('dayInfo/<str:date>/<int:user_id>', views.DayUserInfoView.as_view()),
]