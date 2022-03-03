
from django.contrib import admin

# Register your models here.
from .models import WorkoutInfo, DayHistoryWorkout, DayHistoryExtraWorkout

admin.site.register(WorkoutInfo)
admin.site.register(DayHistoryWorkout)
admin.site.register(DayHistoryExtraWorkout)
