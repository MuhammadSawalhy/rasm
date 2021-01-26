from rest_framework import serializers
from .models import Rasma,Feedback
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','username','password']
        extra_kwargs={'password':{'write_only':True, 'required':True}}

    def create(self, validated_data):
        user=User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class RasmaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Rasma
        fields = '__all__'


class FeedbackSerializer(serializers.ModelSerializer):

    class Meta:
        model = Feedback
        fields = '__all__'

