# Generated by Django 2.2.3 on 2019-12-17 10:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exercise', '0009_auto_20191217_1025'),
    ]

    operations = [
        migrations.AlterField(
            model_name='program',
            name='branch',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='program',
            name='identify',
            field=models.BooleanField(blank=True, default='', null=True),
        ),
        migrations.AlterField(
            model_name='program',
            name='intro',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='program',
            name='law',
            field=models.CharField(blank=True, default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='program',
            name='name',
            field=models.CharField(blank=True, default='', max_length=80),
        ),
        migrations.AlterField(
            model_name='program',
            name='phone',
            field=models.CharField(blank=True, default='', max_length=20),
        ),
    ]