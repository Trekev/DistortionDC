from django.shortcuts import render
from . import models
from django.views import generic
import datetime
from django.http import HttpResponse
from django.core import serializers
import simplejson as json
# Create your views here.

def Upcoming(request):

    json_serializer = serializers.get_serializer("json")()
    shows = json_serializer.serialize(models.Show.objects.all().order_by('id'), ensure_ascii=True)
    return render(request, 'upcoming/index.html', {'shows': shows})
