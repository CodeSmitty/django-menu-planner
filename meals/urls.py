from django.urls import include, path
from rest_framework_nested.routers import SimpleRouter, NestedSimpleRouter

from .views import (
    CheckAuthenticatedView,
    GetCSRFToken,
    index,
    LoginView,
    # mealQueries,
    MealViewSet,
    MenuViewSet,
)

router = SimpleRouter()
router.register(r'menus', MenuViewSet, basename="menus")

menu_router = NestedSimpleRouter(router, r'menus', lookup='menu')
menu_router.register(r'meals', MealViewSet, basename='menu-meals')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(menu_router.urls)),
    path('login/', LoginView.as_view()),
    path("", index, name='index'),
    path('authenticated/', CheckAuthenticatedView.as_view()),
    path('csrf_cookie/', GetCSRFToken.as_view()),
    # path('matches/', mealQueries.as_view()),
]
