from django.urls import path,re_path,reverse
from app_order import views
from app_order.views import *

urlpatterns = [
    path('order/', Order.as_view(), name='order'),
]