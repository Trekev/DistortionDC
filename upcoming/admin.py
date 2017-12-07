from django.contrib import admin

from .models import Events
from .models import Show
from .models import Venue

admin.site.register(Events)
admin.site.register(Show)
admin.site.register(Venue)
# Register your models here.
