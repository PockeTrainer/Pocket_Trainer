from django.urls import path

from . import views

urlpatterns = [
    # path('', views.sendWorkoutInfo.as_view()),
    # path('history/<int:user_id>/<str:date>', views.dayHistoryAPIView.as_view()),
    # path('pushUp/<int:user_id>', views.pushUpAPIView.as_view()),
    path('lastTestResult/<int:user_id>', views.LastTestResultView.as_view()),
    path('testResult/<int:user_id>', views.SaveTestResultView.as_view()),
    path('createRoutine/<int:user_id>', views.CreateRoutineView.as_view()),
    path('todayRoutine/<int:user_id>', views.TodayRoutineView.as_view()),
    path('userWorkoutInfo/<str:workout>/<int:user_id>', views.GetUserWorkoutInfo.as_view()),
    path('workoutResult/<str:workout>/<int:user_id>', views.WorkoutResultView.as_view()),
    path('changeUserWorkoutInfo/<str:workout>/<int:user_id>', views.ChangeUserWorkoutInfo.as_view()),
    path('changeWorkoutFeedback/<str:workout>/<int:user_id>', views.WorkoutFeedbackView.as_view()),
]
