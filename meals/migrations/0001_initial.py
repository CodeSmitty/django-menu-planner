# Generated by Django 3.1.7 on 2021-11-17 11:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Meal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(db_index=True)),
                ('type', models.CharField(choices=[('lunch', 'Lunch'), ('dinner', 'Dinner')], max_length=10)),
                ('url', models.URLField(default='')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['date', '-type'],
            },
        ),
        migrations.CreateModel(
            name='Menu',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('users', models.ManyToManyField(related_name='menus', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='MealItem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('type', models.CharField(choices=[('entre', 'Entre'), ('side', 'Side'), ('other', 'Other')], max_length=10)),
                ('is_dairy_free', models.BooleanField(default=False, help_text='Dairy Free', verbose_name='D')),
                ('is_gluten_free', models.BooleanField(default=False, help_text='Gluten Free', verbose_name='G')),
                ('is_vegetarian', models.BooleanField(default=False, help_text='Vegetarian', verbose_name='V')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('meal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='items', to='meals.meal')),
            ],
        ),
        migrations.AddField(
            model_name='meal',
            name='menu',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meals', to='meals.menu'),
        ),
        migrations.CreateModel(
            name='ClientHouse',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=20)),
                ('house_menu', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='menu', to='meals.menu')),
            ],
        ),
        migrations.AlterUniqueTogether(
            name='meal',
            unique_together={('menu', 'date', 'type', 'url')},
        ),
    ]
