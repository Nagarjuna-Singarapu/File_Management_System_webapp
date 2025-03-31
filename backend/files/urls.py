# backend/files/urls.py
from django.urls import path
from .views import FileUploadView, FileListView, FileDownloadView, DashboardView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('list/', FileListView.as_view(), name='file-list'),
    path('download/<int:file_id>/', FileDownloadView.as_view(), name='file-download'),
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
]
