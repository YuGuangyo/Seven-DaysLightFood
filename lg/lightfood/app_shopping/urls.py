from django.urls import path,re_path,reverse
from app_shopping.views import *
from app_shopping import views

urlpatterns = [
    path('shop/', MyShop.as_view(), name='shop'),
    path('sub/', Sub.as_view(), name='sub'),
    path("addpage/",AddPage.as_view(),name='addpage'),
    path("shopdel/",ShopDel.as_view(),name='shopdel'),

]
