from django.urls import path

from . import views

urlpatterns = [
    path('mainpageInfo/<int:user_id>', views.MainPageInfoView.as_view()),
    path('<str:date>/<int:user_id>', views.DayHistoryView.as_view()),
]

