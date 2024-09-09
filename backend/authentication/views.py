from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

class RegisterUser(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not username or not email or not password:
            return Response({'error': 'Please provide all fields'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user= User.objects.create_user(username=username, email= email, password=password)
            
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status= status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
# Create your views here.
