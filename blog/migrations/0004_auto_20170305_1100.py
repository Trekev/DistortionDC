# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2017-03-05 16:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0003_entry_listimage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='entry',
            name='listimage',
            field=models.ImageField(default='D:\\DistortionDC\\distortiondc\x08log\\static\x08log\\img\\default.jpg', upload_to='bloglistimages'),
        ),
    ]
