from django.contrib import admin
from .models import Scheme, MuscleGroup, WorkoutType, WorkoutSubType, Tempo

@admin.register(Scheme)
class SchemeAdmin(admin.ModelAdmin):
    list_display = ('name', 'min_reps', 'max_reps', 'min_rest', 'max_rest')

@admin.register(MuscleGroup)
class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ('name',)

class WorkoutSubTypeInline(admin.TabularInline):
    model = WorkoutSubType.muscles.through
    extra = 1

@admin.register(WorkoutType)
class WorkoutTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_individual')

@admin.register(WorkoutSubType)
class WorkoutSubTypeAdmin(admin.ModelAdmin):
    list_display = ('name', 'workout_type')
    filter_horizontal = ('muscles',)
    list_filter = ('workout_type',)
    search_fields = ('name', 'workout_type__name')


@admin.register(Tempo)
class TempoAdmin(admin.ModelAdmin):
    list_display = ('value',)
    search_fields = ('value',)