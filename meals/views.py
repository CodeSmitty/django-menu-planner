from django.shortcuts import render, redirect
from rest_framework import viewsets, permissions
from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from django.contrib import messages
from rest_framework.response import Response
from .models import Menu, Meal
from .pagination import MealPagination
from .serializers import MenuSerializer, MealSerializer
from rest_framework.views import APIView
from django.utils.decorators import method_decorator


class MenuViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer

    


class MealViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = MealSerializer
    pagination_class = MealPagination

    def get_queryset(self):
        print("hola", self.kwargs["menu_pk"])
        return Meal.objects.filter(menu=self.kwargs['menu_pk'])

@method_decorator(csrf_protect, name='dispatch')
def my_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')

    if request.method == 'POST':
             user = authenticate(username=username, password=password)

             if user is not None:
                 login(request, user)
                 Response({'isAuthenticated:success'})
                 return redirect("http://localhost:8000/authenticated/")
             else:
                Response({'isAuthenticated:Error'})
                messages.info(request, 'Username or Password is incorrect')

    context = {}


    # if user is not None:
    #     login(request,user)

    # else:
    #     print('need to login')
    return render(request, 'login/login.html', context)

def index(request):
    return render(request, 'build/index.html')

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticatedView(APIView):
    def get(self, request, format=None):
        user = self.request.user


        try:
            isAuthenticated = user.is_authenticated

            if isAuthenticated:
                return Response({'isAuthenticated': "success"})
            else:
                return Response({ 'isAuthenticated': 'error' })
        except:
            return Response({ 'error': 'Something went wrong when checking authentication status' })


@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({ 'success': 'CSRF cookie set' })


 