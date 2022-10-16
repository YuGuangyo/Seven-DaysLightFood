from app_user import views
from django.urls import path

from django.urls import path,re_path,reverse
from app_user.views import *
from app_user import views


urlpatterns = [
    # path('login/', views.login, name='login'),
    path('login/', MyUser.as_view(), name='login'),
    # path('login_1/',views.login_1,name = 'login_1'),
    path('index/', views.index, name='index'),
    # path('register/', views.register, name='register'),
    path('register/', MyRegister.as_view(), name='register'),
    path('log_out/', views.log_out, name='log_out'),
    path('repassword/', RepassWord.as_view(), name='repassword'),
    path('Brandintroduction/',views.Brandintroduction, name='Brandintroduction'),

]