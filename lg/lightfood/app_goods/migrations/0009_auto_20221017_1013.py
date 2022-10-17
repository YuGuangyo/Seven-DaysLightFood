# Generated by Django 3.2 on 2022-10-17 02:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app_goods', '0008_alter_goodspu_type_kinds_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='goodspu',
            name='type_path',
            field=models.CharField(default=1, max_length=128),
        ),
        migrations.AlterField(
            model_name='goodspu',
            name='type_kinds_id',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='kinds', to='app_goods.goodskinds'),
        ),
    ]
