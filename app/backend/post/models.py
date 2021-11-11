from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()

    def __str__(self):
        """A string representation of the model."""
        return self.title


class User(AbstractUser):
    bodyType = models.CharField(max_length=200, null=True, default= '')
    email = models.CharField(max_length=200, null=True, default= '')
    sex =  models.CharField(max_length=200, null=True, default= '')
    age = models.IntegerField(null=True)
    
    upperBodyStrength = models.IntegerField(null=True, blank=True)
    stomachStrength = models.IntegerField(null=True, blank=True)
    lowerBodyStrength = models.IntegerField(null=True, blank=True)
    def __str__(self):
        return self.username