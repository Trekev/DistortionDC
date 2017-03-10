from django.shortcuts import render
from . import models
from django.views import generic

# Create your views here.

def AboutDDC(request):
    return render(request, 'about/ddc.html')

    
