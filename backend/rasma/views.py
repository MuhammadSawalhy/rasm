from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer,RasmaSerializer,RasmaImageSerializer,AboutSerializer,FeedbackSerializer
from .paginations import MyOffsetPagination
from django.contrib.auth.models import User
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from rest_framework.authentication import TokenAuthentication
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_framework.permissions import IsAuthenticated
from rest_auth.social_serializers import TwitterLoginSerializer
from .models import Rasma,RasmaImage,About,Feedback

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    pagination_class = MyOffsetPagination
   
class RasmaViewSet(viewsets.ModelViewSet):
    queryset=Rasma.objects.all()
    serializer_class=RasmaSerializer
    pagination_class = MyOffsetPagination
    
class RasmaImageViewSet(viewsets.ModelViewSet):
    queryset=RasmaImage.objects.all()
    serializer_class=RasmaImageSerializer
    pagination_class = MyOffsetPagination
   
class AboutViewSet(viewsets.ModelViewSet):
    queryset=About.objects.all()
    serializer_class=AboutSerializer
    pagination_class = MyOffsetPagination
    
    permission_classes=(IsAuthenticated,)
class FeedbackViewSet(viewsets.ModelViewSet):
    queryset=Feedback.objects.all()
    serializer_class=FeedbackSerializer
    pagination_class = MyOffsetPagination
    
    

class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter

class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter