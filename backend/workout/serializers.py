from rest_framework import serializers
from .models import Scheme, MuscleGroup, WorkoutType, WorkoutSubType, Tempo

class SchemeSerializer(serializers.ModelSerializer):
    repRanges = serializers.ListField(source='rep_ranges', child=serializers.IntegerField())
    ratio = serializers.ListField(source='ratio_range', child=serializers.IntegerField())
    rest = serializers.ListField(source='rest_range', child=serializers.IntegerField())

    class Meta:
        model = Scheme
        fields = ('name', 'repRanges', 'rest', 'ratio')

class MuscleGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = MuscleGroup
        fields = ('name',)

class WorkoutSubTypeSerializer(serializers.ModelSerializer):
    muscles = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field='name'
    )
    class Meta:
        model = WorkoutSubType
        fields = ('name', 'muscles')

class WorkoutTypeSerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField()

    class Meta:
        model = WorkoutType
        fields = ('name', 'data')

    def get_data(self, obj):
        if obj.is_individual:
            individual_subtype = obj.sub_types.filter(name='individual').first()
            if individual_subtype:
                return [m.name for m in individual_subtype.muscles.all()]
            return []
        else:
            sub_types_data = {}
            for sub_type in obj.sub_types.all():
                sub_types_data[sub_type.name] = [m.name for m in sub_type.muscles.all()]
            return sub_types_data

class TempoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tempo
        fields = ('value',)