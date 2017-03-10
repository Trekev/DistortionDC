from django.shortcuts import render
from . import models
from django.views import generic
# Create your views here.

def Upcoming(request):
    return render(request, 'upcoming/index.html')
