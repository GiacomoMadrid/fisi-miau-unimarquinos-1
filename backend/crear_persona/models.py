from django.db import models
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError

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
    

class Usuario(models.Model):
    cargo = models.CharField(max_length = 30)
    datos = models.ForeignKey(Persona, on_delete=models.CASCADE)
    
    def __str__(self):
            return self.datos.primerApellido + " "+self.datos.segundoApellido + ", " +self.datos.prenombres + " - " + self.cargo
    
    
