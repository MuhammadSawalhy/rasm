from rest_framework import viewsets
from .serializers import UserSerializer,RasmaSerializer,FeedbackSerializer
from .paginations import MyOffsetPagination
from django.contrib.auth.models import User
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.twitter.views import TwitterOAuthAdapter
from rest_auth.social_serializers import TwitterLoginSerializer
from .models import Rasma,Feedback

class UserViewSet(viewsets.ModelViewSet):
    queryset=User.objects.all()
    serializer_class=UserSerializer
    pagination_class = MyOffsetPagination
   

class RasmaViewSet(viewsets.ModelViewSet):
    queryset=Rasma.objects.all()
    serializer_class=RasmaSerializer
    pagination_class = MyOffsetPagination
   

class FeedbackViewSet(viewsets.ModelViewSet):
    queryset=Feedback.objects.all()
    serializer_class=FeedbackSerializer
    pagination_class = MyOffsetPagination


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class TwitterLogin(SocialLoginView):
    serializer_class = TwitterLoginSerializer
    adapter_class = TwitterOAuthAdapter

