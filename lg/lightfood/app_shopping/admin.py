from django.contrib import admin
import app_order,app_user,app_shopping,app_goods
from . import models

# Register your models here.
for table in models.__all__:
    admin.site.register(getattr(models, table))
