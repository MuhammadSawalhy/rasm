from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Rasma(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    title = models.CharField(max_length=80, blank=False)
    description = models.TextField(default="")
    version = models.FloatField()
    data = models.TextField(blank=False)
    tags = models.CharField(max_length=100, default="")
    # TODO: unified timezone in the dackend databases
    creation_date = models.DateTimeField(default=timezone.now)
    last_modified_at = models.DateTimeField(default=timezone.now)
    # TODO: thumbnail to be in the POST API
    thumbnail = models.ImageField(upload_to='images')

    def __str__(self):
        return self.title


# TODO: thumbnail to be in the POST API
# remove this model
class RasmaImage(models.Model):
    image=models.ImageField(max_length=None)
    rasma=models.ForeignKey(Rasma,on_delete=models.CASCADE)
    version=models.FloatField()

    #  def __int__(self):
    #      return self.id_set


class Feedback(models.Model):
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    feedback = models.TextField(default="")
    
    def __str__(self):
        return self.user.name

