from django.urls import include, path
from rest_framework_nested.routers import SimpleRouter, NestedSimpleRouter

from .views import MenuViewSet, MealViewSet, LoginView, index, CheckAuthenticatedView, GetCSRFToken,  UserMenuView, mealQueries

router = SimpleRouter()
router.register(r'menus', MenuViewSet, basename="menus")
router.register(r"user", UserMenuView, basename="user_id")

menu_router = NestedSimpleRouter(router, r'menus', lookup="user_menu_id")
user_router = NestedSimpleRouter(router, r'user', lookup="user_id")

menu_router.register(r'meals', MealViewSet, basename='menu-meals')



urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(menu_router.urls)),
    path('login/', LoginView.as_view()),
    path("", index, name='index'),
    path('authenticated/', CheckAuthenticatedView.as_view()),
    path('csrf_cookie/',GetCSRFToken.as_view() ),
    # path('matches/', mealQueries.as_view()),

]
