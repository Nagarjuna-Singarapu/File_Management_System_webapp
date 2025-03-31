from django.db import models
from users.models import UserProfile 

class UploadedFile(models.Model):
    file = models.FileField(upload_to='uploads/')
    filename = models.CharField(max_length=255, default="unknown")
    upload_date = models.DateTimeField(auto_now_add=True)
    file_type = models.CharField(max_length=50, default="unknown")
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, blank=True, related_name="files")

    def __str__(self):
        return self.filename
