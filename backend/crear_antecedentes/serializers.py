from rest_framework import serializers, routers, viewsets
from .models import *

class DepartamentoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Departamento
        fields = '__all__'


class ProvinciaSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Provincia
        fields = '__all__'


class DistritoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Distrito
        fields = '__all__'


class TipoAntecedenteSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TipoAntecedente
        fields = '__all__'


class TipoCertificadoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = TipoCertificado
        fields = '__all__'


class HistorialCertificadoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = HistorialCertificado
        fields = '__all__'


class CertificadoSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Certificado
        fields = '__all__'


class AntecedenteSerializer(serializers.ModelSerializer):
    class Meta: 
        model = Antecedente
        fields = '__all__'

