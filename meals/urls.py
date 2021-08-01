from django.urls import include, path, re_path
from rest_framework_nested.routers import SimpleRouter, NestedSimpleRouter
from django.views.generic.base import TemplateView

from .views import (
    CheckAuthenticatedView,
    GetCSRFToken,
    index,
    LoginView,
    # mealQueries,
    MealViewSet,
    MenuViewSet,
    ClientViewset,
    LogoutView, 
)

router = SimpleRouter()
router.register(r'menus', MenuViewSet, basename="menus")
router.register(r'house_menu', ClientViewset, basename='house_name')

menu_router = NestedSimpleRouter(router, r'menus', lookup='menu')
menu_router.register(r'meals', MealViewSet, basename='menu-meals')


urlpatterns = [
    path('api/', include(router.urls)),
    path('api/', include(menu_router.urls)),
    path('api/authenticated', CheckAuthenticatedView.as_view(), name='authenticated'),
    path('', index, name='index'),
    path('api/csrf_cookie', GetCSRFToken.as_view()),
    path('api/login', LoginView.as_view(), name='login'),
    path('api/logout', LogoutView.as_view(), name='logout'),
    
    # path('matches/', mealQueries.as_view()),
]


# urlpatterns += [re_path(r'^.*', index)]
urlpatterns += [re_path(r'^(?:.*)/?$', index)]


