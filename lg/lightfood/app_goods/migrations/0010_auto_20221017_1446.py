# Generated by Django 3.2 on 2022-10-17 06:46

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_goods', '0009_auto_20221017_1013'),
    ]

    operations = [
        migrations.CreateModel(
            name='SkuType',
            fields=[
                ('SkuType_id', models.AutoField(primary_key=True, serialize=False)),
                ('SkuType_name', models.CharField(max_length=32)),
            ],
        ),
        migrations.AddField(
            model_name='goodsku',
            name='goods_SkuType_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='app_goods.skutype'),
        ),
    ]
