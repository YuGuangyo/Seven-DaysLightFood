from django.shortcuts import render, redirect
from django.views import View
from app_user.models import Stu,Addr
from app_shopping.models import Shopping

class Order(View):
    def get(self,request):
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        user_obj = Stu.objects.filter(username=user).first()
        # user_addr = Addr.objects.filter(addr_stu_id=user_id)
        # print(user_addr)
        if Shopping.objects.filter(stu_id_id=user_id):
            ord = Shopping.objects.filter(stu_id_id=user_id, shop_delete=1).all()
            sum_list = []
            for i in ord:
                sum = 0
                sum += i.shop_price * i.shop_num
                sum_list.append(sum)
            xj = 0
            for i in sum_list:
                xj += i
        if Addr.objects.filter(addr_stu_id_id=user_id):
            addr = Addr.objects.filter(addr_stu_id_id=user_id).all()
            print(addr)
        return render(request,"order.html",locals())


class Del(View):
    def get(self,request):
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        if Shopping.objects.filter(stu_id_id=user_id):
            Shopping.objects.filter(stu_id_id=user_id).update(shop_delete=0)
        return redirect("/")
