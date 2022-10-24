from django.shortcuts import render, HttpResponse, redirect, reverse
from app_goods.models import *
from django.contrib import auth
from django.http import JsonResponse
from django.views import View
from app_goods.models import GoodSpu, GoodsKinds
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
import re, time
import redis
from rest_framework.response import Response
from rest_framework import serializers
from django.core import serializers


# from .serializers import C
# Create your views here.
# def CaiPin(request):
#     return render(request,'CaiPin.html')
#
# class gouwuche(View):
#     def post(self, request):
#         # 获取参数,校验参数 (使用序列化器)
#         serializer = CartSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True) # 取出验证后的参数
#         sku_id = serializer.validated_data['sku_id']
#         count = serializer.validated_data['count']
#         selected = serializer.validated_data['selected']
#         # 判断用户是否登录，这里不明白的可以看一下我之前写的django中的user验证
#         try:
#             user = request.user
#         except Exception:
#             user = None
#         if user is not None and user.is_authenticated:
#             # 登录，将数据存到redis 默认勾选
#             redis_conn = get_redis_connection('cart')  # 建立redis链接
#             pl = redis_conn.pipeline()  # 建立管道，一次发送所有redis命令，不用多次连接redis
#             pl.hincrby('cart_%s' % user.id, sku_id, count)  # 插入域名为'cart_%s'%user.id，key为sku_id,value为count的数据，域不存在会自己创建
#             if selected:
#                 pl.sadd('cart_select_%s' % user.id, sku_id)  # 若勾选，则会将商品id加入集合，若集合不存在则创建
#             pl.execute()  # 将命令一次执行
#             return Response(serializer.validated_data, status=status.HTTP_201_CREATED)  # 返回相应给前端
#         else:
#             # 未登录，将数据存到cookie
#             cart_dict = request.COOKIES.get('cart')  # 从cookie中拿到购物车数据
#             if cart_dict is not None:
#                 cookie_cart = pickle.loads(base64.b64decode(cart_dict.encode()))  # 若存在，将数据转化为字典
#             else:
#                 cookie_cart = {}  # 若不存在，建立一个新的字典
#             if sku_id in cookie_cart:# 若商品已在购物车中，则将数据进行更新
#                 cookie_cart[sku_id]['count'] += count
#                 cookie_cart[sku_id]['selected'] = selected
#             else:  # 若不存在，则建立新的数据
#                 cookie_cart[sku_id] = {
#                     'count': count,
#                     'selected': selected
#                 }
#
#     cart_cookie = base64.b64encode(pickle.dumps(cookie_cart)).decode()  # 将数据进行加密，并转化为字符串
#     response = Response(serializer.validated_data, status=status.HTTP_201_CREATED)
#     response.set_cookie('cart', cart_cookie, max_age=constants.CART_COOKIE_EXPIRES)  # 给相应设置cookie
#     return response
def CaiPin(request):
    # kinds = GoodSpu.objects.all()
    kinds = GoodsKinds.objects.all()
    spu_img = Imgs.objects.all()
    # print(kinds)
    # print(kinds.first())
    # print(kinds.first().goodspu_set)
    # print(kinds.first().goodspu_set.first().type_name)
    try:
        b = request.GET.get('id')

        c = int(b)
        spu = GoodsKinds.objects.get(goods_kinds_id=b)
    except Exception:
        spu = GoodsKinds.objects.get(goods_kinds_id=1)

    a = spu.kinds.all()
    # print(a[1].type_name)
    # for i in a:
    #     print(i)
    #     print(i.type_name)
    # print(a)

    # if request.method == 'POST':
    #     lx = request.POST.get("a")
    #     print(lx)
    #     return HttpResponse("1")

    # print(products)
    # print(spu_img)
    return render(request, 'spu.html', locals())
class SaGood(View):

    def get(self, request, goods_id):
        # try:
        # print(goods_id)
        spu = GoodSpu.objects.get(type_id=goods_id)
        # print(spu.type_name)
        # print(spu.type_id)
        img = Imgs.objects.get(img_type_id=spu.type_id)
        # print(img.img_name)
        try:
            sku = GoodSku.objects.filter(goods_type_id=spu.type_id)
            # print(sku)
        except GoodSku.DoesNotExist:
            return HttpResponse('jjj')
        return render(request, 'sku.html', locals())
