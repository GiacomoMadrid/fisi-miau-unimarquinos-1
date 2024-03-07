from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import permissions
from .models import *
from .serializers import *
from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login


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



def authenticate_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return True
    else:
        return False

# Creación de usuario
def create_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    cargo = request.POST.get('cargo')
    primer_apellido = request.POST.get('primer_apellido')
    segundo_apellido = request.POST.get('segundo_apellido')
    prenombres = request.POST.get('prenombres')
    telefono = request.POST.get('telefono')
    direccion = request.POST.get('direccion')

    # Verifica si el usuario ya existe
    if Usuario.objects.filter(username=username).exists():
        return False

    # Crea el nuevo usuario
    user = Usuario.objects.create_user(username=username, password=password, cargo=cargo)
    user.datos = Persona.objects.create(
        primerApellido=primer_apellido,
        segundoApellido=segundo_apellido,
        prenombres=prenombres,
        telefono=telefono,
        direccion=direccion
    )
    user.save()
    return True


@csrf_exempt
def registro_usuario(request):
    if request.method == 'POST':
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'mensaje': 'Usuario registrado correctamente'})
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@csrf_exempt
def iniciar_sesion(request):
    if request.method == 'POST':
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return JsonResponse({'mensaje': 'Inicio de sesión exitoso'})
            else:
                return JsonResponse({'error': 'Credenciales inválidas'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        return JsonResponse({'error': 'Método no permitido'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)
