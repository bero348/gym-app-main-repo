from django.contrib import admin
from django import forms
from .models import NutritionTip , MealPlan , Recipe ,Food
from jsoneditor.forms import JSONEditor 
# Register your models here.

admin.site.register(NutritionTip)
admin.site.register(Food)


class MealPlanAdminForm(forms.ModelForm):
    class Meta:
        model = MealPlan
        fields = '__all__'
        widgets = {
            'description': JSONEditor,
        }

@admin.register(MealPlan)
class MealPlanAdmin(admin.ModelAdmin):
    form = MealPlanAdminForm 
    list_display = ('time', 'description_preview')
    search_fields = ('time',)

    def description_preview(self, obj):
        if obj.description:
            if isinstance(obj.description, list):
                return ", ".join(obj.description[:3]) + ("..." if len(obj.description) > 3 else "")
            return obj.description[:50] + "..." if len(obj.description) > 50 else obj.description
        return "No description"
    description_preview.short_description = "Description"

class RecipeAdminForm(forms.ModelForm):
      class Meta:
        model = Recipe
        fields = '__all__'
        widgets = {
            'ingredients': JSONEditor,
        }

@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    form = RecipeAdminForm
    list_display = ('title', 'ingredients_preview') # عرض مختصر للمكونات
    search_fields = ('title',)

    def ingredients_preview(self, obj):
        if obj.ingredients:
            if isinstance(obj.ingredients, list):
                return ", ".join(obj.ingredients[:3]) + ("..." if len(obj.ingredients) > 3 else "")
            return obj.ingredients[:50] + "..." if len(obj.ingredients) > 50 else obj.ingredients
        return "No ingredients"
    ingredients_preview.short_description = "Ingredients"
