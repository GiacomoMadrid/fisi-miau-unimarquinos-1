from django.contrib import admin
from .models import *

admin.site.register(Certificado)
admin.site.register(Antecedente)
admin.site.register(Departamento)
admin.site.register(Provincia)
admin.site.register(Distrito)
admin.site.register(TipoAntecedente)
admin.site.register(TipoCertificado)
admin.site.register(HistorialCertificado)

# Register your models here.
