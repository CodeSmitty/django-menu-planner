from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile
from .serializers import UserProfileSerializer

class GetUserProfileView(APIView):

    serializer_class = UserProfileSerializer
    def get_queryset(self):
        return  MyUser.objects.get(id=self.request.user.id)