from django.contrib.auth.models import User
from django.db import models

class Address(models.Model):
    user = models.ForeignKey("UserProfile", on_delete=models.CASCADE, related_name="addresses")
    address = models.TextField()

    def __str__(self):
        return self.address

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    phone = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.user.username
