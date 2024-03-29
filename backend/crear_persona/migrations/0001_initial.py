# Generated by Django 5.0.3 on 2024-03-06 22:11

import crear_persona.models
import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Pais',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Nacionalidad',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nombre', models.CharField(max_length=30)),
                ('pais', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crear_persona.pais')),
            ],
        ),
        migrations.CreateModel(
            name='Persona',
            fields=[
                ('numeroDocumento', models.CharField(max_length=9, primary_key=True, serialize=False, validators=[django.core.validators.RegexValidator('^\\d{9}$')])),
                ('primerApellido', models.CharField(max_length=30)),
                ('segundoApellido', models.CharField(max_length=30)),
                ('prenombres', models.CharField(max_length=80)),
                ('fechaNacimiento', models.DateField()),
                ('estadoCivil', models.CharField(max_length=1, validators=[crear_persona.models.validate_estado_civil])),
                ('nacionalidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crear_persona.nacionalidad')),
                ('paisOrigen', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crear_persona.pais')),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cargo', models.CharField(max_length=30)),
                ('datos', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crear_persona.persona')),
            ],
        ),
    ]
