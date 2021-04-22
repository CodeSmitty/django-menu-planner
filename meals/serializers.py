from rest_framework import serializers

from .models import Menu, Meal, MealItem, UserMenu
from django.contrib.auth.models import User


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name']


class MealItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealItem
        fields = ['name', 'type', 'is_dairy_free',
                  'is_gluten_free', 'is_vegetarian',]


class MealSerializer(serializers.ModelSerializer):
    items = MealItemSerializer(many=True, read_only=True)

    class Meta:
        model = Meal
        fields = [ 'id', 'date', 'type', 'items','menu', ]

class UserMenuSerializer(serializers.ModelSerializer):
    items = MealSerializer(many=True, read_only=True)
    class Meta:
        model = UserMenu
        fields =['user', 'menu', 'id', 'items']

       