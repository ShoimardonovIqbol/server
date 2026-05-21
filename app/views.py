from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import AllowAny
from django.contrib.auth import get_user_model

User = get_user_model()

# 1. Саҳифаи чатро нишон медиҳад
def chat_room_page(request):
    return render(request, "chat.html")

# 2. Ин API барои гирифтани Токени JWT аст (Логин)
class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
