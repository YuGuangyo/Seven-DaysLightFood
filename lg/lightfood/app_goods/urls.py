from app_user import views
from django.urls import path

from django.urls import path, re_path, reverse
from app_goods.views import *
from app_goods import views

urlpatterns = [
    path("CaiPin/", views.CaiPin, name='CaiPin'),
    path("ceshi/",views.ceshi,name = 'ceshi'),

]