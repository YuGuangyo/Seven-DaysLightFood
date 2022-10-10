from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, HttpResponse, redirect, reverse


# Create your views here.
def login(request):
    if request.method == 'GET':
        # 当为get请求时，返回login.html页面,页面中的{% url 'login_page' %}会被反向解析成路径：/login/
        return render(request, 'login.html')
    if request.method == 'POST':
        # 当为post请求时，可以从request.POST中取出请求体的数据
        name = request.POST.get('name')
        pwd = request.POST.get('pwd')
        if name == 'lx' and pwd == '123':
            url = reverse('index')  # reverse会将别名'index_page'反向解析成路径：/index/
            return redirect(url)  # 重定向到/index/
        else:
            return HttpResponse('用户名或密码错误')
def index(request):
    return render(request,'index.html')