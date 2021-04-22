from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    REQUIRED_FIELDS = ('user',)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    menu = models.CharField(max_length=200, default="")

    def __str__(self):
        return self.user.username