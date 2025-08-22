
from rest_framework import serializers
from .models import Exercise, ExerciseVariant, MuscleGroup, Equipment

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ['name']

class EquipmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Equipment
        fields = ['name']

class ExerciseVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExerciseVariant
        fields = ['name', 'description']

class ExerciseSerializer(serializers.ModelSerializer):
    
    muscles = MuscleGroupSerializer(many=True, read_only=True)
    equipment = EquipmentSerializer(many=True, read_only=True)
    substitutes = serializers.SerializerMethodField() 

    
    variants = serializers.SerializerMethodField()
    
    class Meta:
        model = Exercise
        fields = [
            'name', 'exercise_type', 'unit', 'description', 
            'muscles', 'equipment', 'substitutes', 
            'environment', 'level', 'variants'
        ]

    def get_variants(self, obj):
        
        return {v.name: v.description for v in obj.variants.all()}

    def get_substitutes(self, obj):
       
        return [sub.name for sub in obj.substitutes.all()]