# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-11-05 20:29
from __future__ import unicode_literals

import ckeditor_uploader.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('upcoming', '0005_auto_20171105_1421'),
    ]

    operations = [
        migrations.AddField(
            model_name='venue',
            name='body',
            field=ckeditor_uploader.fields.RichTextUploadingField(default='Literally ANYTHING'),
        ),
    ]
