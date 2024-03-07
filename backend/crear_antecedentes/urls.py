from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register(r'Certificado', views.CertificadoViewSet, 'Certificado')
router.register(r'Antecedente', views.AntecedenteViewSet, 'Antecedente')
router.register(r'Departamento', views.DepartamentoViewSet, 'Departamento')
router.register(r'Provincia', views.ProvinciaViewSet, 'Provincia')
router.register(r'Distrito', views.DistritoViewSet, 'Distrito')
router.register(r'TipoAntecedente', views.TipoAntecedenteViewSet, 'TipoAntecedente')
router.register(r'TipoCertificado', views.TipoCertificadoViewSet, 'TipoCertificado')
router.register(r'HistorialCertificado', views.HistorialCertificadoViewSet, 'HistorialCertificado')

urlpatterns = urlpatterns = router.urls