from django.shortcuts import render
from django.views import View
from app_user.models import Stu
from app_shopping.models import Shopping

class Order(View):
    def get(self,request):
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        user_obj = Stu.objects.filter(username=user).all()
        print(user_obj.username)
        if Shopping.objects.filter(stu_id_id=user_id):
            ord = Shopping.objects.filter(stu_id_id=user_id).all()


        return render(request,"order.html",locals())

