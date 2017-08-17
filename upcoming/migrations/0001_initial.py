# -*- coding: utf-8 -*-
# Generated by Django 1.10.6 on 2017-08-16 23:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Events',
            fields=[
                ('even_id', models.AutoField(primary_key=True, serialize=False)),
                ('event_name', models.CharField(blank=True, max_length=255, null=True)),
                ('start_date', models.DateTimeField(blank=True, null=True)),
                ('end_date', models.DateTimeField(blank=True, null=True)),
                ('event_type', models.CharField(blank=True, max_length=10, null=True)),
            ],
        ),
    ]
