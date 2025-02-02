from django.contrib import messages, auth
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User, Permission
from django.db.models.query import QuerySet
from django.http.response import HttpResponseRedirect
from rest_framework.authentication import SessionAuthentication

from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie, csrf_exempt
from django.shortcuts import get_object_or_404, render, redirect

from rest_framework import serializers, viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAuthenticated

from .models import Menu, Meal, ClientHouse, MealItem
from .pagination import MealPagination
from .serializers import MenuSerializer, MealSerializer, ClientSerializer, UserSerializer, MealItemSerializer



class CheckAuthenticatedView(APIView):
    serializer_class = MenuSerializer
    authentication_classes = [SessionAuthentication]

    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, format=None):
        user = self.request.user
        print("user: ", user)
        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                groupName = user.groups.filter(user=user).values()[0]
                return Response({"isAuthenticated": "success", "user": user.username, "role": groupName['name'], "user_id": user.id})
            else:
                print("user not auth: ", user)
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})


class CreateMenuPermission(BasePermission):

    @classmethod
    def get_extra_actions(cls):
        return []

    def has_object_permission(self, request, view, obj):

        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user


class MenuViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    def get_queryset(self):
        if User.is_authenticated:
            return self.request.user.menus.all()
        else:
            print('no esta aqui señor')


class MealViewSet(LoginRequiredMixin, viewsets.ModelViewSet):
    serializer_class = MealSerializer
    pagination_class = MealPagination

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = Menu.objects.all()
            menu = get_object_or_404(
                queryset, pk=self.kwargs['menu_pk'], users=self.request.user)

            return Meal.objects.filter(menu=menu)
        else:
            print("not auth")
            return HttpResponseRedirect(self.request, "/login")

    def create(self, request, menu_pk):
        data = self.request.data
        user = self.request.user

        if user.is_authenticated and user.has_perm("meals.change_menu"):
            if request.method == "POST":  # use put instead of post.
                serializer = MealSerializer(data=data, partial=True)

                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response({'success': "Your post was successfull.", 'data': serializer.data})
                return Response({'failure': 'post was not authenticated'})
        return Response({'failure': "user is not authenticated or does not have permission to submit form"})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if request.method == 'DELETE':
            print('post request')
            meal_item = MealSerializer()

        return Response({'success': 'Your post was deleted'})


class MealItemView(LoginRequiredMixin, viewsets.ModelViewSet):
    serializer_class = MealItemSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            print(self.request.user)
            return MealItem.objects.all()
        else:
            print("not auth")
            return HttpResponseRedirect(self.request, "/login")

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        try:
            if request.method == 'DELETE':
                if user.is_authenticated and user.has_perm('meals.delete_mealitem'):
                    self.perform_destroy(instance)
                    return Response({"success": "You have succesfully deleted meal item."})
                return Response({'Failure': 'You do not have permission to make this request. Please refer to admin'})
        except:
            return Response({'Error': self.request.error.message})

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = self.request.user
        data = self.request.data
        datas = self

        
        try:
            if request.method == 'PUT':
                if user.is_authenticated:
                    print(instance)
                    partial = kwargs.pop('partial', False)
                    instance = self.get_object()
                    serializer = self.get_serializer(instance, data=self.request.data, partial=partial)
                    print(serializer)
                    serializer.is_valid(raise_exception=True)
                    self.perform_update(serializer)
                    
                    print('update')
                    return Response({'success':'You have succesfully updated meal.'})
        except:
            return Response({'error': 'error'})

        


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )
    authentication_classes = [SessionAuthentication]
    serializer_class = UserSerializer

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
                groupName = user.groups.filter(user=user).values()[0]
                group_perms = user.get_group_permissions()
                if user.has_perm('meals.change_meal'):
                    return Response({"success": "isAuthenticated", "role": groupName['name'], "user": user.username, 'user_id': user.id})
                if user.has_perm('meals.view_meal'):
                    print(user)
                    return Response({'success': 'isAuthenticated', "role": groupName['name'], "user": user.username, 'user_id': user.id})
                else:
                    return Response({"error": "You do not have permission to see this page"})
            else:
                return Response({'error': 'Error Authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in '})


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': "Logged Out"})
        except:
            return Response({'error': "There was an error loging out"})


def index(request):
    print(request)
    return render(request, 'build/index.html')


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})



