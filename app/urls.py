from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import chat_room_page, MyTokenObtainPairView

urlpatterns = [
    path("chat-room/", chat_room_page, name="chat_room"),
    
    path("api/token/", MyTokenObtainPairView.as_asgi() if hasattr(MyTokenObtainPairView, 'as_asgi') else MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
]
