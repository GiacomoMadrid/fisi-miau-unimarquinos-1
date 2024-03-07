from django.urls import path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'Usuario', views.UsuarioViewSet, 'Usuario')
router.register(r'Pais', views.PaisViewSet, 'Pais')
router.register(r'Nacionalidad', views.NacionalidadViewSet, 'Nacionalidad')
router.register(r'Persona', views.PersonaViewSet, 'Persona')

urlpatterns = urlpatterns = router.urls


