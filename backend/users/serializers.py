from django.contrib.auth.models import User
from rest_framework import serializers
from .models import UserProfile, Address

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "address"]

class UserProfileSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)  

    class Meta:
        model = UserProfile
        fields = ["phone", "addresses"]

class RegisterSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(required=True)
    last_name = serializers.CharField(required=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password", "first_name", "last_name"] 
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        first_name = validated_data.pop('first_name')
        last_name = validated_data.pop('last_name')
        
        user = User.objects.create_user(**validated_data)

        user.first_name = first_name
        user.last_name = last_name
        user.save()

        user_profile = UserProfile.objects.create(user=user)

        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate_username(self, value):
        if not value:
            raise serializers.ValidationError("Username cannot be empty")
        return value

    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError("Password cannot be empty")
        return value


class AddressCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "address"]

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', required=False)
    phone = serializers.CharField(required=False, allow_blank=True)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)
    email = serializers.EmailField(source='user.email', required=False)

    class Meta:
        model = UserProfile
        fields = ["username", "phone", "first_name", "last_name", "email"]

    def update(self, instance, validated_data):
        user_data = validated_data.get('user', {})
        if 'username' in user_data:
            instance.user.username = user_data['username']
        if 'first_name' in user_data:
            instance.user.first_name = user_data['first_name']
        if 'last_name' in user_data:
            instance.user.last_name = user_data['last_name']
        if 'email' in user_data:
            instance.user.email = user_data['email']
        instance.user.save()

        if 'phone' in validated_data:
            instance.phone = validated_data['phone']
        instance.save()

        return instance

