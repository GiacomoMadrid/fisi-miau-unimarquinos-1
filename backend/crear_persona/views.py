from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import *
from .serializers import *


class PaisViewSet(viewsets.ModelViewSet):
    serializer_class = PaisSerializer
    fields = '__all__'
    queryset = Pais.objects.all()
      
class NacionalidadViewSet(viewsets.ModelViewSet):
    serializer_class = NacionalidadSerializer
    fields = '__all__'
    queryset = Nacionalidad.objects.all()
      
class PersonaViewSet(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    fields = '__all__'
    queryset = Persona.objects.all()

class UsuarioViewSet(viewsets.ModelViewSet):
    serializer_class = UsuarioSerializer
    fields = '__all__'
    queryset = Usuario.objects.all()