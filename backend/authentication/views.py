from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from django.core.mail import send_mail
from django.utils.crypto import get_random_string

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
        
        
class ForgetPassword(APIView):
    def post(self, request):
        email = request.data.get('email')
        if email:
            try:
                user = User.objects.get(email=email)
                reset_token = get_random_string(length=32)
                
                reset_url = "http://localhost:3000/reset-password?token={reset_token}"
                send_mail(
                    'Reset Password',
                    'Please click on the link to reset your password: ' + reset_url.format(reset_token),
                    'noreply@auth.com',
                    [email],
                    fail_silently=False,
                )
                return Response({ "message: password reset message ,"}, status=status.HTTP_200_OK)
            except  User.DoesNotExist:
                return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)

# Create your views here.
