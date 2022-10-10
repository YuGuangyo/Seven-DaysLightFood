from app_user import views
from django.urls import path


urlpatterns = [
    path('login/', views.login, name='login'),
    path('index/', views.index, name='index'),
]