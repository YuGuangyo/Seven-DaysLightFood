from app_user import views
from django.urls import path,re_path

from django.urls import path, re_path, reverse
from app_goods.views import *
from app_goods import views

urlpatterns = [
    path("CaiPin/", views.CaiPin, name='CaiPin'),
    path("ceshi/",views.ceshi,name = 'ceshi'),
    # re_path(r"ceshi/?id=1",views.ceshi,name = 'ceshi'),
    # re_path(r'^CaiPin/(?P<goods_id>\d+)',views.sku,name = 'sku'),
    re_path(r'^goodsku/(?P<goods_id>\d+)', SaGood.as_view(), name='goodsku'),  # 详情页

]