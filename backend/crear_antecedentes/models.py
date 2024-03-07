from django.db import models
from crear_persona.models import Persona
from crear_persona.models import Usuario
from crear_persona.models import Pais

class Departamento(models.Model):
    nombre = models.CharField(max_length = 30)
    pais = models.ForeignKey(Pais, on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre + ", " + self.pais.nombre


class Provincia (models.Model):
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE)
    nombre = models.CharField(max_length = 30)

    def __str__(self):
        return self.nombre + ", " + self.departamento.nombre


class Distrito (models.Model):
    provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE)
    nombre = models.CharField(max_length = 50)

    def __str__(self):
        return self.nombre + ", " + self.provincia.nombre


class TipoAntecedente(models.Model):
    nombre = models.CharField(max_length = 50)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre


class TipoCertificado(models.Model):
    nombre = models.CharField(max_length = 50)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre


class HistorialCertificado(models.Model):
    duenno = models.ForeignKey(Persona, on_delete=models.CASCADE)
    tipo = models.ForeignKey(TipoCertificado, on_delete=models.CASCADE, null = True)
    num_certificados = models.IntegerField(default=0)

    def __str__(self):
        return f" {self.duenno.numeroDocumento}: Historial de {self.tipo.nombre} - {self.duenno.primerApellido}, {self.duenno.segundoApellido}, {self.duenno.prenombres}" 

class Certificado(models.Model):
    tipo = models.ForeignKey(TipoCertificado, on_delete=models.CASCADE)
    version = models.IntegerField(default=1)
    cambios = models.TextField()
    historial = models.ForeignKey(HistorialCertificado, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.id: 
            self.historial.num_certificados += 1
            self.historial.save()            
            ultima_version = Certificado.objects.filter(historial=self.historial).order_by('-version').first()

            if ultima_version:
                self.version = ultima_version.version + 1

            else:
                self.version = 1 

        super(Certificado, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.tipo.nombre} - version: {self.version}. DNI: {self.historial.duenno.numeroDocumento} - {self.historial.duenno.primerApellido} {self.historial.duenno.segundoApellido}, {self.historial.duenno.prenombres}" 


class Antecedente(models.Model):
    tipo = models.ForeignKey(TipoAntecedente, on_delete=models.CASCADE)
    certificado = models.ForeignKey(Certificado, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    fechaRegistro = models.DateTimeField()
    departamento = models.ForeignKey('Departamento', on_delete=models.CASCADE)
    provincia = models.ForeignKey('Provincia', on_delete=models.CASCADE)
    distrito = models.ForeignKey('Distrito', on_delete=models.CASCADE)
    usuarioRegistrador = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if not self.id:              
            copia_certificado = self.certificado
            copia_certificado.id = None
            copia_certificado.save()
            self.certificado = copia_certificado

        super(Antecedente, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.tipo.nombre} - {self.certificado.historial.duenno.primerApellido} {self.certificado.historial.duenno.segundoApellido}, {self.certificado.historial.duenno.prenombres}" 




