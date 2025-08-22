
from django.db import models

class Equipment(models.Model):
    name = models.CharField(max_length=100, unique=True)

    
    def __str__(self):
        return self.name

class MuscleGroup(models.Model):
    name = models.CharField(max_length=100, unique=True)

    
    def __str__(self):
        return self.name

class Exercise(models.Model):
    EXERCISE_TYPES = [
        ('compound', 'مركب (Compound)'),
        ('accessory', 'إضافي (Accessory)'),
    ]
    UNIT_CHOICES = [
        ('reps', 'تكرارات (Reps)'),
        ('duration', 'مدة (Duration)'),
    ]
    ENVIRONMENT_CHOICES = [
        ('gym', 'نادي رياضي (Gym)'),
        ('home', 'منزل (Home)'),
        ('gymhome', 'نادي/منزل (Gym & Home)'),
    ]

    name = models.CharField(max_length=255, unique=True)
    
    exercise_type = models.CharField(
        max_length=50, 
        choices=EXERCISE_TYPES
    )
    unit = models.CharField(
        max_length=50, 
        choices=UNIT_CHOICES
    )
    description = models.TextField()
    

    muscles = models.ManyToManyField(MuscleGroup, related_name='exercises')
    equipment = models.ManyToManyField(Equipment, blank=True)
    
  
    substitutes = models.ManyToManyField('self', blank=True,symmetrical=False)

   
    environment = models.CharField(
        max_length=50, 
        choices=ENVIRONMENT_CHOICES
    )

    level_str = models.CharField(
        max_length=255, 
        blank=True,
        default=""
    )

  
    @property
    def level(self):
        if self.level_str:
            try:
              
                return [int(x.strip()) for x in self.level_str.split(',') if x.strip()]
            except ValueError:
              
                return []
        return []

   
    @level.setter
    def level(self, value):
        if isinstance(value, list):
            
            self.level_str = ",".join(map(str, value))
        elif value is None:
            self.level_str = ""
        else:
        
            self.level_str = str(value)

   
    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    
    def to_flattener_format(self):
        data = {
            "name": self.name,
            "type": self.exercise_type,
            "meta": {
                "environment": self.environment,
                "level": self.level,
                "equipment": [eq.name for eq in self.equipment.all()],
            },
            "unit": self.unit,
            "muscles": [m.name for m in self.muscles.all()], 
            "description": self.description,
            "substitutes": [sub.name for sub in self.substitutes.all()], 
            "variants": {v.name: v.description for v in self.variants.all()},
        }
        return data
    
 

class ExerciseVariant(models.Model):
    exercise = models.ForeignKey(
        Exercise, 
        on_delete=models.CASCADE, 
        related_name='variants', 
      
    )
    name = models.CharField(max_length=100)
    description = models.TextField()

    class Meta:
        unique_together = ('exercise', 'name') 

        
    def __str__(self):
        return f"{self.exercise.name} - {self.name}"