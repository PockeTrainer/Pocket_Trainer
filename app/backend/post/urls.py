from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListPost.as_view()),
    path('<int:pk>/', views.DetailPost.as_view()),
    path('user', views.DetailUser.as_view()),
    path('testResult/<int:user_id>', views.testResultAPIView.as_view()),
]