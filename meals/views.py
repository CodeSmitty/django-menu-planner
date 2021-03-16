from django.shortcuts import render
from rest_framework import viewsets

from .models import Menu, Meal
from .pagination import MealPagination
from .serializers import MenuSerializer, MealSerializer


class MenuViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class MealViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MealSerializer
    pagination_class = MealPagination

    def get_queryset(self):
        return Meal.objects.filter(menu=self.kwargs['menu_pk'])
