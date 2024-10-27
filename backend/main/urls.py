from django.urls import path
from .views import GeminiAPIView, RegisterView, LoginView

urlpatterns = [
    path('api/gemini/', GeminiAPIView.as_view(), name='gemini_api'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]

