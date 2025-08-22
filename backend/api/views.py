from django.shortcuts import render
from django.http import JsonResponse 

from api.models import User
from exercise.models import Exercise
from diet.models import NutritionTip , MealPlan , Recipe , Food
from workout.models import Scheme, WorkoutType, Tempo , MuscleGroup 
from equipment.models import Equipment 

from api.serializer import MyTokenObtainPairSerializer, RegisterSerializer
from exercise.serializers import ExerciseSerializer
from diet.serializers import NutritionTipSerializer,MealPlanSerializer,RecipeSerializer , FoodsSerializer
from workout.serializers import SchemeSerializer, WorkoutTypeSerializer, TempoSerializer , MuscleGroupSerializer
from equipment.serializers import EquipmentSerializer 

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView 
from rest_framework import generics
from exercise.utils import exercisesFlattener 




class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


# Get All Routes

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token/',
        '/api/register/',
        '/api/token/refresh/'
    ]
    return Response(routes)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def testEndPoint(request):
    if request.method == 'GET':
        data = f"Congratulation {request.user}, your API just responded to GET request"
        return Response({'response': data}, status=status.HTTP_200_OK)
    elif request.method == 'POST':
        text = "Hello buddy"
        data = f'Congratulation your API just responded to POST request with text: {text}'
        return Response({'response': data}, status=status.HTTP_200_OK)
    return Response({}, status.HTTP_400_BAD_REQUEST)

class NutritionTipview(APIView):
    def get(self,request):
        query=NutritionTip.objects.all()
        serializer=NutritionTipSerializer(query,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class  MealPlanview(APIView):
     def get(self,request):
        query=MealPlan.objects.all()
        serializer=MealPlanSerializer(query,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
     
class  Recipeview(APIView):
      def get(self,request):
        query=Recipe.objects.all()
        serializer=RecipeSerializer(query,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
      
class  Foodview(APIView):
    def get(self,request):
        query=Food.objects.all()
        serializer=FoodsSerializer(query,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
     




class ExerciseListAPIView(APIView):
    
    def get(self, request, format=None):
        queryset = Exercise.objects.all()
        
       
        exercises_data_for_frontend = {}
        for exercise_instance in queryset:
           
            exercises_data_for_frontend[exercise_instance.name] = exercise_instance.to_flattener_format()
            
        flattened_exercises = exercisesFlattener(exercises_data_for_frontend)
        
       
        response_data = list(flattened_exercises.values())
        
        return Response(response_data,status=status.HTTP_200_OK)
    

class SchemeList(generics.ListAPIView):
    queryset = Scheme.objects.all()
    serializer_class = SchemeSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = {item['name']: {k: v for k, v in item.items() if k != 'name'} for item in serializer.data}
        return Response(data)

class WorkoutTypeList(generics.ListAPIView):
    queryset = WorkoutType.objects.all()
    serializer_class = WorkoutTypeSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = {item['name']: item['data'] for item in serializer.data}
        return Response(data)


class TempoList(generics.ListAPIView):
    queryset = Tempo.objects.all()
    serializer_class = TempoSerializer
    
    def list(self, request, *args, **kwargs):
        
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = [item['value'] for item in serializer.data]
        return Response(data)

class Musclegroupview(APIView):
    def get(self,request):
        query=MuscleGroup.objects.all()
        serializer=MuscleGroupSerializer(query,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)   

class Equipmentview(APIView):
    def get(self,request):
        query=Equipment.objects.all()
        serializer=EquipmentSerializer(query,mant=True)
        return Response(serializer.data,status=status.HTTP_200_OK)        