from django.db import models



class Scheme(models.Model):
    name = models.CharField(max_length=50, unique=True)
    min_reps = models.IntegerField()
    max_reps = models.IntegerField()
    workout_ratio_numerator = models.IntegerField()
    workout_ratio_denominator = models.IntegerField()
    min_rest = models.IntegerField()
    max_rest = models.IntegerField()

    def __str__(self):
        return self.name

    @property
    def rep_ranges(self):
        return [self.min_reps, self.max_reps]

    @property
    def ratio_range(self):
        return [self.workout_ratio_numerator, self.workout_ratio_denominator]

    @property
    def rest_range(self):
        return [self.min_rest, self.max_rest]


class MuscleGroup(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class WorkoutType(models.Model):
    name = models.CharField(max_length=50, unique=True)
    is_individual = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class WorkoutSubType(models.Model):
    name = models.CharField(max_length=50)
    workout_type = models.ForeignKey(WorkoutType, related_name='sub_types', on_delete=models.CASCADE)
    muscles = models.ManyToManyField(MuscleGroup)

    class Meta:
        unique_together = ('name', 'workout_type')

    def __str__(self):
        return f"{self.workout_type.name} - {self.name}"


class Tempo(models.Model):
    value = models.CharField(max_length=10, unique=True)  

    def __str__(self):
        return self.value