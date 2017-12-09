from django.contrib import admin

from .models import Genre
from .models import Show
from .models import Venue

admin.site.register(Show)
admin.site.register(Venue)
admin.site.register(Genre)
# Register your models here.
