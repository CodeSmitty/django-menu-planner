from django.urls import include, path
from rest_framework_nested.routers import SimpleRouter, NestedSimpleRouter

from .views import MenuViewSet, MealViewSet

router = SimpleRouter()
router.register(r'menus', MenuViewSet)

menu_router = NestedSimpleRouter(router, r'menus', lookup='menu')
menu_router.register(r'meals', MealViewSet, basename='menu-meals')

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(menu_router.urls)),
]
