from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.contrib.auth.models import AbstractUser

def validate_estado_civil(value):
    if value.upper() not in ['S', 'C', 'V', 'D']:
        raise ValidationError('El estado civil debe ser S, C, V o D.')
    

###################################################### Clases #################################################################
     
class Pais(models.Model):
    nombre = models.CharField(max_length = 30)

    def __str__(self):
            return self.nombre
    

class Nacionalidad(models.Model):
    pais = models.OneToOneField(Pais, on_delete=models.CASCADE)
    nombre = models.CharField(max_length = 30)

    def __str__(self):
            return self.nombre
    

class Persona(models.Model):
    numeroDocumento = models.CharField(max_length=20,  primary_key=True, validators=[RegexValidator(r'^\d{1,20}$')], null = False)
    tipoDocumento = models.CharField(max_length = 30)
    primerApellido = models.CharField(max_length = 30)
    segundoApellido = models.CharField(max_length = 30)
    prenombres = models.CharField(max_length = 80)
    fechaNacimiento = models.DateField()
    estadoCivil = models.CharField(max_length = 1, validators=[validate_estado_civil])
    paisOrigen = models.ForeignKey(Pais, on_delete=models.CASCADE)
    nacionalidad = models.ForeignKey(Nacionalidad, on_delete=models.CASCADE)
    
    def __str__(self):
            return self.numeroDocumento+ ": "+self.primerApellido + " "+self.segundoApellido + ", " +self.prenombres 
    

class Usuario(AbstractUser):
    cargo = models.CharField(max_length = 30)
    datos = models.ForeignKey(Persona, on_delete=models.CASCADE, null=True, unique=True)
    telefono = models.CharField(max_length=9, null=True, blank =True, validators=[RegexValidator(r'^\d{9}$')])
    direccion = models.CharField(max_length=255, null=True, blank =True)

    def __str__(self):
        if self.datos:
            return f"{self.datos.primerApellido} {self.datos.segundoApellido}, {self.datos.prenombres} - {self.cargo}"
        else:
            return f"User {self.username} - {self.cargo}"

    @property
    def first_name(self):
        if self.datos:
            return self.datos.prenombres
        else:
            return self.username

    @property
    def last_name(self):
        if self.datos:
            return f"{self.datos.primerApellido} {self.datos.segundoApellido}"
        else:
            return ""
    

    
