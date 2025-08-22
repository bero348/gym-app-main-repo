from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('test/', views.testEndPoint, name='test'),
    path('', views.getRoutes),
    path('diet/NutritionTip/',views.NutritionTipview.as_view()),
    path('diet/MealPlan/',views.MealPlanview.as_view()),
    path('diet/Recipe/',views.Recipeview.as_view()),
    path('diet/foods/',views.Foodview.as_view()),
    path('exercises/',views.ExerciseListAPIView.as_view(), name='exercise-list'),
    path('schemes/', views.SchemeList.as_view(), name='scheme-list'),
    path('workouts/', views.WorkoutTypeList.as_view(), name='workout-type-list'),
    path('tempos/', views.TempoList.as_view(), name='tempo-list'),
    path('musclegroups/',views.Musclegroupview.as_view(),),
    path('equipment/',views.Equipmentview.as_view(),),
    ] 