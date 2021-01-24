from django.db import models
from django.contrib.auth.models import User
from phone_field import PhoneField
from django.utils import timezone

class Rasma(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    id_set=models.IntegerField()
    title=models.CharField(max_length=80)
    description= models.TextField()
    version=models.FloatField()
    creation_date = models.DateTimeField(default=timezone.now)
    last_modified =models.DateTimeField(auto_now=True)
    thumbnail=models.ImageField(upload_to='images')

    def __str__(self):
        return self.title
class RasmaImage(models.Model):
    image=models.ImageField(max_length=None)
    id_set=models.IntegerField()
    rasma=models.ForeignKey(Rasma,on_delete=models.CASCADE)
    version=models.FloatField()

    def __int__(self):
        return self.id_set

class About(models.Model):
    name=models.CharField(max_length=255)
    job=models.TextField(max_length=255)
    
    def __str__(self):
        return self.name
        
class Feedback(models.Model):
    name=models.CharField(max_length=255)
    phone = PhoneField(blank=True, help_text='phone number')
    
    def __str__(self):
        return self.name