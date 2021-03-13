from django.shortcuts import render
from django.utils import dateparse
from rest_framework import viewsets

from .models import Meal
from .serializers import MealSerializer


class MealViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MealSerializer

    def get_queryset(self):
        date_param = self.request.query_params.get('week_of', None)
        if date_param:
            date = dateparse.parse_date(date_param)
            return Meal.objects.week_of(date)
        else:
            return Meal.objects.current_week()
