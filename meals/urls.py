from django.urls import include, path
from rest_framework_nested.routers import SimpleRouter, NestedSimpleRouter

from .views import MenuViewSet, MealViewSet, my_user, index, CheckAuthenticatedView, GetCSRFToken

router = SimpleRouter()
router.register(r'menus', MenuViewSet)

menu_router = NestedSimpleRouter(router, r'menus', lookup='menu')
menu_router.register(r'meals', MealViewSet, basename='menu-meals')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(menu_router.urls)),
    path('login/', my_user),
    path("", index, name='index'),
    path('authenticated/', CheckAuthenticatedView.as_view()),
    path('csrf_cookie/',GetCSRFToken.as_view() )

]
