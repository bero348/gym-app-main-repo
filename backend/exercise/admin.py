
from django.contrib import admin
from .models import Exercise, ExerciseVariant, MuscleGroup, Equipment


class ExerciseVariantInline(admin.TabularInline): 
    model = ExerciseVariant
    extra = 1 
    fields = ('name', 'description')

@admin.register(Exercise)
class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name', 'exercise_type', 'unit', 'environment')
    search_fields = ('name', 'description')
    list_filter = ('exercise_type', 'unit', 'environment', 'muscles', 'equipment')
    filter_horizontal = ('muscles', 'equipment', 'substitutes') 
    
    inlines = [ExerciseVariantInline]

    fieldsets = (
        (None, {
            'fields': ('name', 'exercise_type', 'unit', 'description')
        }),
        ('العضلات والمعدات والبدائل', {
            'fields': ('muscles', 'equipment', 'substitutes'),
            'description': 'حدد مجموعات العضلات المستهدفة، والمعدات، والتمارين البديلة.'
        }),
        ('بيانات إضافية (Meta)', {
            'fields': ('environment', 'level_str'),
            'description': 'بيئة التمرين ومستوى الصعوبة (مثال: 0, 1, 2).'
        }),
    )

@admin.register(MuscleGroup)
class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

@admin.register(Equipment)
class EquipmentAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)