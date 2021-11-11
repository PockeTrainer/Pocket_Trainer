from django.urls import path

from . import views

urlpatterns = [
    # path('', views.sendWorkoutInfo.as_view()),
    path('history/<int:user_id>/<str:date>', views.dayHistoryAPIView.as_view()),
    path('pushUp/<int:user_id>', views.pushUpAPIView.as_view()),
]
