from django.shortcuts import render, HttpResponse, redirect, reverse
from app_user.models import *
from django.contrib import auth
from django.http import JsonResponse
from django.views import View
from app_user.models import Stu
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import re, time
from rest_framework import serializers


class MyRegister(View):
    '''注册'''

    def get(self, request):
        return render(request, 'login_1.html')

    def post(self, request):
        # 进行注册处理
        # 接收数据
        username = request.POST.get('user_name')
        password = request.POST.get('pwd')
        email = request.POST.get('email')
        phonenumber = request.POST.get('phonenumber')
        allow = request.POST.get('allow')  # 用户使用协议
        print(username, password, email, phonenumber)
        # 进行数据校验 all里面的参数都为真时则返回真
        # if not all([username, password, email, phonenumber]):
        #     # 数据不完整
        #     return render(request, 'register.html', {'errmsg': '数据不完整'})
        #
        #
        # # 校验邮箱 使用正则，导入re库
        # if not re.match(r'^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', email):
        #     return render(request, 'register.html', {'errmsg': '邮箱格式不正确'})
        #
        if allow != 'on':
            return render(request, 'login_1.html', {'errmsg': '请同意协议'})
            # return HttpResponse('3')
        # 校验用户名是否重复
        try:
            user = Stu.objects.get(username=username)
        except Stu.DoesNotExist:
            # 用户名不存在
            user = None

        if user:
            # 用户名已存在
            return render(request, 'login_1.html', {'errmsg': '用户名已存在'})

        # 进行业务处理: 进行用户注册 Django内置方法
        user = Stu.objects.create_user(username=username, email=email, password=password, stu_phonenumber=phonenumber,
                                       )
        user.is_active = 1
        user.save()

        # 返回应答, 跳转到首页，reverse方向解析函数
        return redirect(reverse('login'))


class MyUser(View):
    '''
    登陆
    '''

    def get(self, request):
        return render(request, "login_1.html")

    def post(self, request):
        username = request.POST["name"]
        password = request.POST['pwd']

        user =Stu.objects.filter(username=username).first()
        try:
            if user.username == username:
                user_obj = authenticate(username=username, password=password)
                print(user_obj)
                if user_obj is not None:
                    login(request, user_obj)
                else:
                    return render(request, 'login_1.html', {'errmsg': '密码可能错误了呢'})
                # return render(request, "index.html")
                return redirect(reverse('index'))
            # else:
            #     return render(request, 'login_1.html', {'errmsg': '用户不存在'})
        except Exception:
            return render(request, 'login_1.html', {'errmsg': '用户不存在'})
        else:
            return render(request, 'login_1.html', {'errmsg': '请输入用户名'})

# 注销
def log_out(request):
    logout(request)
    return redirect('login')
# 加上装饰器使得方法只能在登录后调用
@login_required(login_url='login/')  # 这里设置未登录时跳转路径
def index(request):
    return render(request, 'index.html')


class RepassWord(View):
    def get(self, request):
        return render(request, 'repassword.html')

    def post(self, request):
        # 进行注册处理
        # 接收数据
        username = request.POST.get('user_name')
        password = request.POST.get('pwd')
        email = request.POST.get('email')
        phonenumber = request.POST.get('phonenumber')
        # allow = request.POST.get('allow')  # 用户使用协议
        print(username, password, email, phonenumber)
        # 进行数据校验 all里面的参数都为真时则返回真
        # if not all([username, password, email, phonenumber]):
        #     # 数据不完整
        #     return render(request, 'register.html', {'errmsg': '数据不完整'})
        #
        #
        # # 校验邮箱 使用正则，导入re库
        # if not re.match(r'^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$', email):
        #     return render(request, 'register.html', {'errmsg': '邮箱格式不正确'})
        #
        # # if allow != 'on':
        # #     # return render(request, 'register.html', {'errmsg': '请同意协议'})
        # #     return HttpResponse('3')
        # # 校验用户名是否重复
        try:
            user = Stu.objects.filter(username=username).first()
            number = user.stu_phonenumber

        except Exception:
            # 用户名不存在
            user = None
            # return HttpResponse('用户不存在')
            return render(request, 'repassword.html', {'errmsg':'用户不存在'})
        if user:
            if number == phonenumber:
                user.set_password(password)
                user.save()
                return redirect(reverse('login'))
            else:
                return render(request,'repassword.html',{'errmsg': '手机号不匹配'})
                # return HttpResponse('手机号不匹配')

        # 进行业务处理: 进行用户注册 Django内置方法
        # user = Stu.objects.create_user(username=username, email=email, password=password, stu_phonenumber=phonenumber)
        # user.is_active = 0
        # user.save()

        # 返回应答, 跳转到首页，reverse方向解析函数
        # return redirect(reverse('index'))

def Brandintroduction(request):
    return render(request,'Brandintroduction.html')
