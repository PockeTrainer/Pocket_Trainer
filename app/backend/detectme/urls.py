from django.urls import path

from . import views

urlpatterns = [
    #path('', views.testAPIView.as_view()),
    path('detectme', views.detectme),
]