from django.db import models


# Create your models here.

__all__ = ['OrderInfo']
class OrderInfo(models.Model):
    order_id = models.AutoField(primary_key=True)
    order_time = models.DateTimeField(auto_now_add=True, db_index=True)
    order_stu_id = models.ForeignKey(to='app_user.Stu', on_delete=models.CASCADE,null=True)
    order_money = models.DecimalField(max_digits=6, decimal_places=2, null=True)
    order_quantity = models.IntegerField()
    CHOICES = ((1, "微信"), (2, "支付宝"), (3, "银行卡"))
    order_paytype = models.IntegerField(choices=CHOICES,max_length=32)
    order_state = models.BooleanField(default=0)
    order_freight = models.IntegerField(default=0)
    order_evaluate = models.OneToOneField(to='app_order.OrderEvaluate', on_delete=models.CASCADE,null=True)
