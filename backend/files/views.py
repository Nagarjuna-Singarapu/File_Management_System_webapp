# backend/files/views.py
import mimetypes
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import UploadedFile
from .serializers import UploadedFileSerializer
from django.http import FileResponse
from urllib.parse import quote
from collections import defaultdict
import os

class FileUploadView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        file = request.FILES.get('file')
        if not file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)
        
        file_type = file.name.split('.')[-1]  
        user_profile = request.user.profile  

        uploaded_file = UploadedFile.objects.create(
            file=file,
            filename=file.name,
            file_type=file_type,
            user_profile=user_profile
        )

        serializer = UploadedFileSerializer(uploaded_file)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class FileListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_profile = request.user.profile
        files = UploadedFile.objects.filter(user_profile=user_profile)
        serializer = UploadedFileSerializer(files, many=True)
        return Response(serializer.data)


class FileDownloadView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, file_id):
        try:
            file = UploadedFile.objects.get(id=file_id, user_profile=request.user.profile)

            response = FileResponse(file.file)

            filename = file.filename  
            response['Content-Disposition'] = f'attachment; filename={quote(filename)}'

            
            mime_type, _ = mimetypes.guess_type(filename)
            if mime_type:
                response['Content-Type'] = mime_type  
            else:
                response['Content-Type'] = 'application/octet-stream'  

            return response
        except UploadedFile.DoesNotExist:
            return Response({"error": "File not found."}, status=status.HTTP_404_NOT_FOUND)
        

class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        all_files = UploadedFile.objects.all()

        total_files = all_files.count()
        file_type_count = defaultdict(int)
        user_file_count = defaultdict(int)
        user_file_type_count = defaultdict(lambda: defaultdict(int))
        user_names = defaultdict(str)

        for file in all_files:
            file_type_count[file.file_type] += 1
            user_file_count[file.user_profile.id] += 1
            user_file_type_count[file.user_profile.id][file.file_type] += 1
            user_names[file.user_profile.id] = file.user_profile.user.username 

        response_data = {
            "total_files": total_files,
            "file_type_count": dict(file_type_count),
            "user_file_count": {
                user_id: count for user_id, count in user_file_count.items()
            },
            "user_file_type_count": {
                user_id: dict(file_types) for user_id, file_types in user_file_type_count.items()
            },
            "user_names": user_names,  
        }

        return Response(response_data)
