from django.shortcuts import render
from rest_framework import viewsets

from .models import Meal
from .pagination import MealPagination
from .serializers import MealSerializer


class MealViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer
    pagination_class = MealPagination
