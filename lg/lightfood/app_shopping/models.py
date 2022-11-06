from django.db import models


# Create your models here.

__all__ = ['OrderInfo','Shopping']
class OrderInfo(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_time = models.DateTimeField(auto_now_add=True, db_index=True)
    order_stu_id = models.ForeignKey(to='app_user.Stu', on_delete=models.CASCADE,null=True)
    order_money = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    order_quantity = models.IntegerField()
    CHOICES = ((1, "微信"), (2, "支付宝"), (3, "银行卡"))
    order_paytype = models.IntegerField(choices=CHOICES)
    order_state = models.BooleanField(default=1)
    order_freight = models.IntegerField(default=0)
    order_evaluate = models.OneToOneField(to='app_order.OrderEvaluate', on_delete=models.CASCADE,null=True)


class Shopping(models.Model):
    shop_id = models.AutoField(primary_key=True)
    shop_spu_name = models.CharField(max_length=32)
    shop_sku_name = models.CharField(max_length=32)
    shop_price = models.FloatField(max_length=32)
    # shop_img = models.CharField(max_length=32)
    shop_num = models.IntegerField(default=1)
    stu_id = models.ForeignKey(to='app_user.Stu', on_delete=models.CASCADE, null=True)
    shop_delete = models.BooleanField(default=1)
    shop_sku_id = models.FloatField(max_length=32)