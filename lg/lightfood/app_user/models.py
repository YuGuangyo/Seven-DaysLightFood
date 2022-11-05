from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
__all__ = ['Stu', 'Addr']

#1.2
class Stu(AbstractUser):
    stu_id = models.AutoField(primary_key=True)
    stu_phonenumber = models.CharField(max_length=11)
    stu_address = models.CharField(max_length=128)
    stu_integral = models.IntegerField(default=0,null=True)
    stu_membertype = models.BooleanField(default=0)
    def __str__(self):
        return self.username
    
class Addr(models.Model):
    addr_id = models.AutoField(primary_key=True)
    addr_name = models.CharField(max_length=32)
    addr_address = models.CharField(max_length=128)
    addr_phonenumber = models.CharField(max_length=11)
    addr_stu_id = models.ForeignKey(to='Stu', on_delete=models.CASCADE, null=True)
    addr_default = models.BooleanField(default=1)