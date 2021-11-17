from django.contrib import messages, auth
from django.contrib.auth import authenticate, login
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.models import User, Permission
from django.http.response import HttpResponseRedirect
from django.http import JsonResponse
from rest_framework.authentication import SessionAuthentication

from django.utils.decorators import method_decorator
from django.contrib.auth.decorators import login_required, permission_required
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie, csrf_exempt
from django.shortcuts import get_object_or_404, render, redirect

from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission, SAFE_METHODS, IsAuthenticated

from .models import Menu, Meal, ClientHouse
from .pagination import MealPagination
from .serializers import MenuSerializer, MealSerializer, ClientSerializer, UserSerializer, MealItemSerializer


@method_decorator(csrf_exempt, name='dispatch')
class CheckAuthenticatedView(APIView):
    queryset = Menu.objects.all()
    # permission_classes = (IsUserStaff, IsUserAdmin)
    authentication_classes = [SessionAuthentication]


    @classmethod
    def get_extra_actions(cls):
        return []

    def get(self, request, format=None):
        user = self.request.user

        try:
            isAuthenticated = user.is_authenticated
            if isAuthenticated:
                groupName = user.groups.filter(user=user).values()[0]
                
                return Response({"isAuthenticated": "success", "user": user.username, "role":groupName['name'], 'role_id':groupName['id']})
            else:
                return Response({'isAuthenticated': 'error'})
        except:
            return Response({'error': 'Something went wrong when checking authentication status'})



class CreateMenuPermission(BasePermission):

    @classmethod
    def get_extra_actions(cls):
        return []

    def has_object_permission(self,request, view, obj):

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


class MealViewSet(LoginRequiredMixin, viewsets.ReadOnlyModelViewSet):
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

    def post(self, request, menu_pk):
        data = self.request.data
        user = self.request.user
        print(data)
        if user.is_authenticated and user.has_perm("meals.change_menu"):
            
            if request.method == "POST":
                serializer =MealSerializer(data=data)
                if serializer.is_valid(raise_exception=True):
                    print("serializer error: ", serializer.errors)
                    print("the serializer:", serializer)
                    serializer.save()
                    return Response({'success':"Your post was successfull."})
                return Response({'failure': 'post was not authenticated'})
        return Response({'failure': "user is not authenticated or does not have permission to submit form"})
            

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
                if user.has_perm('meals.change_menu'):
                    return Response({"success":"isAuthenticated","role":groupName['name'], "user":user.username, 'user_id':user.id, 'level':groupName['id'] })
                elif user.has_perm('meals.client_menu_view'):
                    return Response({'success': 'isAuthenticated',"role":groupName['name'], "user":user.username, 'user_id':user.id, 'level':groupName['id']})
                else:
                    return Response({"error":"You do not have permission to see this page"})
            else:
                return Response({'error': 'Error Authenticating'})
        except:
            return Response({'error': 'Something went wrong when logging in '})


@method_decorator(csrf_exempt, name='dispatch')
class LogoutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success':"Logged Out"})
        except:
            return Response({'error':"There was an error loging out"})

def index(request):
    return render(request, 'build/index.html')

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': 'CSRF cookie set'})


class ClientViewset(viewsets.ReadOnlyModelViewSet):
    # queryset = ClientHouse.objects.all()

    def get_queryset(self):
        menu= Menu.objects.all()
        clientMenu = ClientHouse.objects.all()
        password = ClientHouse.objects.filter(password='skwl', name='Sigma Kappa')


    


