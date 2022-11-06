from django.shortcuts import render, HttpResponse, redirect
from django.views import View
from app_goods.models import GoodSku, Imgs, GoodSpu
from app_shopping.models import Shopping
from app_user.models import Stu
from django.http import JsonResponse


class MyShop(View):
    def get(self, request):
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        if Shopping.objects.filter(stu_id_id=user_id, shop_delete=1):
            cart = Shopping.objects.filter(stu_id_id=user_id, shop_delete=1).all()

            # cart = Shopping.objects.all()

            sum_list = []
            for i in cart:
                sum = 0
                sum += i.shop_price * i.shop_num
                sum_list.append(sum)
            xj = 0
            for i in sum_list:
                xj += i

            i = cart[0]
            k = i.shop_num * i.shop_price
        return render(request, "shopping.html", locals())

    def post(self, request):
        id = request.POST.get('i_id')
        print(id)
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        if Shopping.objects.filter(shop_id=id, shop_delete=1):
            obj = Shopping.objects.filter(shop_id=id).first()
            if obj.shop_num < 50:
                obj.shop_num += 1
            obj.save()
            cart = Shopping.objects.filter(stu_id_id=user_id,shop_delete=1).all()

            sum_list = []
            for i in cart:
                sum = 0
                sum += i.shop_price * i.shop_num
                sum_list.append(sum)
            xj = 0
            for i in sum_list:
                xj += i
            response = JsonResponse({'num': obj.shop_num, 'xj': xj})
        return response


class Sub(View):
    def get(self, request):
        return render(request, "shopping.html")

    def post(self, request):
        id = request.POST.get('i_id')
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        if Shopping.objects.filter(shop_id=id, shop_delete=1):
            obj = Shopping.objects.filter(shop_id=id, shop_delete=1).first()
            if obj.shop_num > 1:
                obj.shop_num -= 1
            obj.save()
            cart = Shopping.objects.filter(stu_id_id=user_id,shop_delete=1).all()

            sum_list = []
            for i in cart:
                sum = 0
                sum += i.shop_price * i.shop_num
                sum_list.append(sum)
            xj = 0
            for i in sum_list:
                xj += i
        response = JsonResponse({'num': obj.shop_num, 'xj': xj})
        return response


class AddPage(View):
    def post(self, request):
        id = request.POST.get('obj_id')
        print(id)
        user = request.user
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        print(user_id)
        # response = JsonResponse({"obj_num": 1})
        shop_sku = GoodSku.objects.get(goods_id=id)
        shop_spu = GoodSpu.objects.get(type_id=shop_sku.goods_type_id.type_id)
        shop_img = Imgs.objects.get(img_type_id=shop_sku.goods_type_id.type_id)
        # Shopping.objects.create(shop_spu_name=shop_spu.type_name,shop_sku_name=shop_sku.goods_SkuType_id.SkuType_name,shop_price=shop_sku.goods_price)
        if Shopping.objects.filter(shop_sku_name=shop_sku.goods_SkuType_id.SkuType_name,
                                   shop_spu_name=shop_sku.goods_name,
                                   stu_id_id=user_id,
                                   shop_delete=1):
            obj = Shopping.objects.filter(stu_id_id=user_id,shop_sku_name=shop_sku.goods_SkuType_id.SkuType_name, shop_delete=1).first()
            obj.shop_num += 1
            obj.save()
        else:
            Shopping.objects.create(shop_spu_name=shop_spu.type_name,
                                    shop_sku_name=shop_sku.goods_SkuType_id.SkuType_name,
                                    shop_price=shop_sku.goods_price,
                                    stu_id_id=user_id,
                                    shop_sku_id=id
                                )

            # Shopping.objects.create(shop_num=num)
        #     鸡胸肉荞麦面  烘煎芝士沙拉汁
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        cart = Shopping.objects.filter(stu_id_id=user_id, shop_delete=1)
        num = 0
        for i in cart:
            num += i.shop_num
        return JsonResponse({"num":num})
        # return render(request, "shopping.html", locals())


class ShopDel(View):
    def get(self,request):
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        if Shopping.objects.filter(stu_id_id=user_id):
            Shopping.objects.filter(stu_id_id=user_id).update(shop_delete=0)
        return redirect("shop")

    def post(self, request):
        id = request.POST.get('obj_id')
        print(id)
        user = request.user
        user_id = Stu.objects.filter(username=user).first().stu_id
        shop_sku = GoodSku.objects.get(goods_id=id)
        if Shopping.objects.filter(shop_sku_name=shop_sku.goods_SkuType_id.SkuType_name,
                                   shop_spu_name=shop_sku.goods_name,
                                   stu_id_id=user_id,
                                   shop_delete=1):
            Shopping.objects.filter(shop_sku_name=shop_sku.goods_SkuType_id.SkuType_name,
                                   shop_spu_name=shop_sku.goods_name,stu_id_id=user_id).update(shop_delete=0)
