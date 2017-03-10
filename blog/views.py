from django.shortcuts import render
from django.views import generic
from django.http import HttpResponse
from . import models

# Create your views here.
class BlogIndex(generic.ListView):
    queryset = models.Entry.objects.published()
    template_name = "blog/blogindex.html"
    paginate_by = 4

class BlogDetail(generic.DetailView):
    model = models.Entry
    template_name = "blog/post.html"

class BlogAll(generic.ListView):
    queryset = models.Entry.objects.published()
    template_name = "blog/allblog.html"
