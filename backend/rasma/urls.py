from django.urls import path,include
from rest_framework import routers
from .views import UserViewSet,RasmaViewSet,FeedbackViewSet

router=routers.DefaultRouter()
router.register('users',UserViewSet)
router.register('rasma',RasmaViewSet)
router.register('feedback',FeedbackViewSet)
urlpatterns = [
    path('', include(router.urls)),
    
]
