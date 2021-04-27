from django.contrib import messages, auth
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie, csrf_exempt
from django.shortcuts import get_object_or_404, render, redirect

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Menu, Meal
from .pagination import MealPagination
from .serializers import MenuSerializer, MealSerializer


class MenuViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    def get_queryset(self):
        if User.is_authenticated:
            return self.request.user.menus.all()
        else:
            print('no esta aqui señor')


class MealViewSet(LoginRequiredMixin, viewsets.ReadOnlyModelViewSet):
    serializer_class = MealSerializer
    pagination_class = MealPagination

    def get_queryset(self):
        if self.request.user.is_authenticated:
            print(self.kwargs)
            queryset = Menu.objects.all()
            menu = get_object_or_404(
                queryset, pk=self.kwargs['menu_pk'], users=self.request.user)
            print(menu)
            return Meal.objects.filter(menu=menu)
        else:
            return Response({"error": "Please Authenticate"})




@method_decorator(csrf_exempt, name='dispatch')

class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = [SessionAuthentication]

    @classmethod
    def get_extra_actions(cls):
        return []

    def post(self, request, format=None):
        data = self.request.data
        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)

                return Response({'success': 'User authenticated'})
            else:
                return Response({'error': 'Error Authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in '})


def index(request):
    return render(request, 'build/index.html')


def mealQueries(request):
    print('ok')


@method_decorator(csrf_exempt, name='dispatch')
class CheckAuthenticatedView(APIView):
    authentication_classes = [SessionAuthentication]

    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': "success", })
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})
