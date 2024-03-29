# Generated by Django 5.0.3 on 2024-03-06 22:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crear_antecedentes', '0001_initial'),
        ('crear_persona', '0003_alter_persona_numerodocumento'),
    ]

    operations = [
        migrations.AddField(
            model_name='departamento',
            name='pais',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='crear_persona.pais'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='distrito',
            name='nombre',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='tipoantecedente',
            name='nombre',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='tipocertificado',
            name='nombre',
            field=models.CharField(max_length=50),
        ),
    ]
