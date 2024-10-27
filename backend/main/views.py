import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import GeminiRequestSerializer, UserSerializer, RegisterSerializer, LoginSerializer
import os
import google.generativeai as genai
from django.contrib.auth.models import User


# Log-in
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })

# Retrieving Response
class GeminiAPIView(APIView):
    def post(self, request):
        serializer = GeminiRequestSerializer(data=request.data)
        
        if serializer.is_valid():
            query = serializer.validated_data['query']
            
            response = retrieveResponse(query)
            print(response.text)
            #if response.status_code == 200:
            
            return Response({"data": response.text}, status=status.HTTP_200_OK)
            #else:
            #   return Response({'error': response}, status=response.status_code)
    
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

def retrieveResponse(query):
    genai.configure(api_key=os.environ['API_KEY'])
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 64,
        "max_output_tokens": 8192,
        "response_mime_type": "text/plain",
    }
    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro",
        generation_config=generation_config
    )
    response = model.generate_content([
        "Respond with a list of 3-6 reasons to do the specified task that I give you. Separate each reason with a semicolon. Make them as short as possible. Dont restate the input",
        "input: Go outside",
        "output: Get some fresh air;  Enjoy the sunshine;  Clear your head;  Get some exercise;  Appreciate nature",
        "input: Read a book",
        "output: Escape into another world;  Learn something new;  Relax and unwind;  Boost your imagination;  Improve your vocabulary",
        "input: Eat",
        "output: Fuel your body;  Provide energy;  Satisfy hunger;  Enjoy delicious flavors;  Support your health",
        "input: Do my homework",
        "output: Learn the material;  Prepare for tests;  Improve my understanding;  Develop my skills;  Earn a good grade",
        "input: Watch anime",
        "output: Escape into fantastical worlds;  Experience unique storytelling;  Enjoy vibrant animation;  Connect with passionate communities;  Learn about different cultures",
        "input: Run a mile",
        "output: Improve cardiovascular health;  Boost endurance;  Release endorphins;  Reduce stress;  Strengthen muscles",
        "input: Go to the gym",
        "output: Build muscle;  Improve fitness;  Boost strength;  Reduce stress;  Enhance overall health;  Socialize with others",
        f"input: {query}",
        "output: ",
    ])
    
    return response