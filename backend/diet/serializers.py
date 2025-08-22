from rest_framework import serializers
from .models import NutritionTip , MealPlan , Recipe ,Food


class NutritionTipSerializer(serializers.ModelSerializer):
    class Meta:
        model = NutritionTip
        fields = '__all__' 


class MealPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model=MealPlan
        fields='__all__'


class RecipeSerializer(serializers.ModelSerializer):
    class Meta :
        model=Recipe
        fields='__all__'        

class  FoodsSerializer(serializers.ModelSerializer):
    class Meta :
        model=Food
        fields='__all__'      

