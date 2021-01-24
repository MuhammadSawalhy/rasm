from django.urls import path,include
from rest_framework import routers
from .views import UserViewSet,RasmaViewSet,RasmaImageViewSet,AboutViewSet,FeedbackViewSet

router=routers.DefaultRouter()
router.register('users',UserViewSet)
router.register('rasma',RasmaViewSet)
router.register('rasmaImage',RasmaImageViewSet)
router.register('About',AboutViewSet)
router.register('feedback',FeedbackViewSet)
urlpatterns = [
    path('', include(router.urls)),
    
]
