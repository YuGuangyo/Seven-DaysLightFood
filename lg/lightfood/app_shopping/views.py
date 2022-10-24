from django.shortcuts import render, HttpResponse
from django.views import View
from app_goods.models import GoodSku,Imgs,GoodSpu
from django.http import JsonResponse

class MyShop(View):
    def get(self, request):
        return render(request, "shopping.html")

    def post(self, request):
        # sku = request.POST.get("a")
        # print(sku)
        # shop_sku = GoodSku.objects.filter(goods_id=sku)
        # print(shop_sku)
        # print(shop_sku.goods_name)
        return HttpResponse("1")


class AddPage(View):

    def post(self,request):

        id = request.POST.get('obj_id')
        print(id)
        response = JsonResponse({"obj_num": 1})
        shop_sku = GoodSku.objects.get(goods_id=id)
        print(shop_sku)
        print(shop_sku.goods_name)
        print(shop_sku.goods_type_id.type_name)
        print(shop_sku.goods_type_id.type_id)
        shop_spu = GoodSpu.objects.get(type_id=shop_sku.goods_type_id.type_id)
        shop_img = Imgs.objects.get(img_type_id=shop_sku.goods_type_id.type_id)
        print(shop_img.img_id)
        return render(request, "shopping.html", locals())
