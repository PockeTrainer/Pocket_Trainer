from django.contrib import admin

# Register your models here.
from .models import DayHistoryUserInfo, User, UserTestResult, UserWorkoutInfo

# admin.site.register(Post)
admin.site.register(User)
admin.site.register(UserWorkoutInfo)
admin.site.register(UserTestResult)
admin.site.register(DayHistoryUserInfo)