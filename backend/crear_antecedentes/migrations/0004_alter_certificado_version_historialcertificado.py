# Generated by Django 5.0.3 on 2024-03-06 23:55

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crear_antecedentes', '0003_rename_fechaacontecimiento_antecedente_fecharegistro'),
    ]

    operations = [
        migrations.AlterField(
            model_name='certificado',
            name='version',
            field=models.IntegerField(default=1),
        ),
        migrations.CreateModel(
            name='HistorialCertificado',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fecha_modificacion', models.DateTimeField(auto_now_add=True)),
                ('certificado', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='crear_antecedentes.certificado')),
            ],
        ),
    ]
