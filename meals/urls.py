from django.urls import include, path
from rest_framework.routers import DefaultRouter

from meals import views

router = DefaultRouter()
router.register(r'meals', views.MealViewSet, basename='meal')

urlpatterns = [
    path('api/', include(router.urls)),
]
