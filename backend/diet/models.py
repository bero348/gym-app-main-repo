from django.db import models

# Create your models here.

class NutritionTip(models.Model):
    title = models.CharField(max_length=150)
    content = models.TextField()
    icon = models.CharField(max_length=50) 
    def  __str__(self):
        return self.title


class MealPlan(models.Model):
    time = models.CharField(max_length=50) 
    description =models.JSONField(default=list, blank=True, null=True)
    
    def __str__(self):
        return self.time
    
class Recipe(models.Model):
    title=models.CharField(max_length=75)
    ingredients=models.JSONField(default=list, blank=True, null=True)

    def __str__(self):
        return self.title
    
class  Food(models.Model):
    name=models.CharField(max_length=50)
    category=models.CharField(max_length=50)
    calories=models.FloatField()
    protein=models.FloatField()
    carbs=models.FloatField()
    fats=models.FloatField()
    serving_size_grams=models.FloatField()