from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import *
from .serializers import *

class DepartamentoViewSet(viewsets.ModelViewSet):
    serializer_class = DepartamentoSerializer
    fields = '__all__'
    queryset = Departamento.objects.all()


class ProvinciaViewSet(viewsets.ModelViewSet):
    serializer_class = ProvinciaSerializer
    fields = '__all__'
    queryset = Provincia.objects.all()


class DistritoViewSet(viewsets.ModelViewSet):
    serializer_class = DistritoSerializer
    fields = '__all__'
    queryset = Distrito.objects.all()


class TipoAntecedenteViewSet(viewsets.ModelViewSet):
    serializer_class = TipoAntecedenteSerializer
    fields = '__all__'
    queryset = TipoAntecedente.objects.all()


class TipoCertificadoViewSet(viewsets.ModelViewSet):
    serializer_class = TipoCertificadoSerializer
    fields = '__all__'
    queryset = TipoCertificado.objects.all()


class HistorialCertificadoViewSet(viewsets.ModelViewSet):
    serializer_class = HistorialCertificadoSerializer
    fields = '__all__'
    queryset = HistorialCertificado.objects.all()


class CertificadoViewSet(viewsets.ModelViewSet):
    serializer_class = CertificadoSerializer
    fields = '__all__'
    queryset = Certificado.objects.all()


class AntecedenteViewSet(viewsets.ModelViewSet):
    serializer_class = AntecedenteSerializer
    fields = '__all__'
    queryset = Antecedente.objects.all()


    
