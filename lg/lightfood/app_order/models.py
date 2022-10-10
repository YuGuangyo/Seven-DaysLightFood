from django.db import models

# Create your models here.
__all__ = ['OrderEvaluate']
class OrderEvaluate(models.Model):
    orderevaluate_id = models.AutoField(primary_key=True)
    orderevaluate_part = models.CharField(max_length=32)
    orderevaluate_date = models.DateTimeField(auto_now_add=True, db_index=True)