from django.contrib import admin

# Register your models here.
from .models import dayHistory, workoutInfo

admin.site.register(dayHistory)
admin.site.register(workoutInfo)