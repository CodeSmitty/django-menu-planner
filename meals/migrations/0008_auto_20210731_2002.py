# Generated by Django 3.1.7 on 2021-08-01 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meals', '0007_auto_20210428_0718'),
    ]

    operations = [
        migrations.AddField(
            model_name='meal',
            name='url',
            field=models.URLField(default=''),
        ),
        migrations.AlterUniqueTogether(
            name='meal',
            unique_together={('menu', 'date', 'type', 'url')},
        ),
    ]
