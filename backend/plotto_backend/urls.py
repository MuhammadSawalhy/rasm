"""plotto_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path,include
from drf_yasg.views import get_schema_view
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import permissions
from drf_yasg import openapi
from rasma.views import FacebookLogin,TwitterLogin

schema_view = get_schema_view( # new
openapi.Info(
title="rasma API",
default_version='v1',
description="A sample API for learning DRF",
terms_of_service="https://www.google.com/policies/terms/",
contact=openapi.Contact(email="muh.aly@outlook.com"),
license=openapi.License(name="BSD License"),
),
public=True,
permission_classes=(permissions.IsAuthenticated,),
)




urlpatterns = [
    path('admin/', admin.site.urls),
    path('rasma_api/',include('rasma.urls')),
    path('auth/', obtain_auth_token),
    #obtain token
    path('api-auth/', include('rest_framework.urls')),
    #authentication
    path('rasma_api/dj-rest-auth/', include('dj_rest_auth.urls')), # new
    #path('rasma_api/dj-rest-auth/registration/', # new
          #include('dj_rest_auth.registration.urls')),
          
          #authentication using facebook and twitter
    path('rest-auth/facebook/', FacebookLogin.as_view(), name='fb_login'),
    path('rest-auth/twitter/', TwitterLogin.as_view(), name='twitter_login'),

    path('swagger/', schema_view.with_ui(
         'swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui(
         'redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)