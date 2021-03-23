from rest_framework import serializers

from .models import Menu, Meal, MealItem

from django.contrib.auth.models import User


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = ['id', 'name']


class MealItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealItem
        fields = ['name', 'type', 'is_dairy_free',
                  'is_gluten_free', 'is_vegetarian']


class MealSerializer(serializers.ModelSerializer):
    items = MealItemSerializer(many=True, read_only=True)

    class Meta:
        model = Meal
        fields = ['id', 'date', 'type', 'items']

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", 'username', 'password']

        extra_kwargs = {"password":{
            'write_only':True,
            'required':True
        }
        
        }

        def validate(self, data):
            if data['password'] != data['confirmed_password']:
                raise serializers.ValidationError("passwords do not match puto")
            return data