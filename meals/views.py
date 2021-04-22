from django.shortcuts import render, redirect
from rest_framework import viewsets, permissions
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie, csrf_exempt
from django.contrib import messages, auth
from rest_framework.response import Response
from .models import Menu, Meal,UserMenu, MealItem
from .pagination import MealPagination
from .serializers import MenuSerializer, MealSerializer, UserMenuSerializer
from rest_framework.views import APIView
from django.utils.decorators import method_decorator
from django.contrib.auth.models import User 
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.sessions.models import Session


class MenuViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    def get_queryset(self):
        user_id = self.request.user.id
        menu = Menu.objects.all()
        if User.is_authenticated:
           return UserMenu.objects.filter(id=user_id)    
        else:
            print('no esta aqui señor')


class MealViewSet(LoginRequiredMixin,viewsets.ReadOnlyModelViewSet):
    serializer_class = MealSerializer
    pagination_class = MealPagination

    def get_queryset(self ):
        if self.request.user.is_authenticated:
            user_id = self.request.user.id
            user_data = UserMenu.objects.filter(user=self.request.user)
            print(user_data)
            
            if user_data.exists():
                return Meal.objects.filter(menu=user_data[0])
        else:
          return Response({"error":"Please Authenticate"})
        








# @method_decorator(csrf_protect, name='dispatch')
# def my_user(request):
#     username = request.POST.get('username')
#     password = request.POST.get('password')

#     if request.method == 'POST':
#              user = authenticate(username=username, password=password)

#              if user is not None:
#                  login(request, user)
#                  Response({'isAuthenticated:success'})
#                  return redirect("http://localhost:8000/authenticated/")
#              else:
#                 Response({'isAuthenticated:Error'})
#                 messages.info(request, 'Username or Password is incorrect')

#     context = {}


#     # if user is not None:
#     #     login(request,user)

#     # else:
#     #     print('need to login')
#     return render(request, 'login/login.html', context)



@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)
            
            if user is not None:
                auth.login(request, user)
                
                redirect("http://localhost:3000/about")
                return Response({ 'success': 'User authenticated', 'data': user.id })
            else:
                return Response({ 'error': 'Error Authenticating' })
        except:
            return Response({ 'error': 'Something went wrong when logging in '  })

def index(request):
    return render(request, 'build/index.html')

def mealQueries(request):
    print('ok')

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user
       

        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': "success", })
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


class UserMenuView(viewsets.ReadOnlyModelViewSet):
    queryset = UserMenu.objects.all()
    serializer_class = UserMenuSerializer


    



    

        



        

    

    

    
    