from django.shortcuts import render
from . import models
from django.views import generic
import datetime
from django.http import HttpResponse
import simplejson as json
# Create your views here.

def Upcoming(request):

    all_events = models.Events.objects.all()
    get_event_types = models.Events.objects.only('event_type')

    # if filters applied then get parameter and filter based on condition else return object
    if request.GET:
        event_arr = []
        if request.GET.get('event_type') == "all":
            all_events = models.Events.objects.all()
        else:
            all_events = models.Events.objects.filter(event_type__icontains=request.GET.get('event_type'))

        for i in all_events:
            event_sub_arr = {}
            event_sub_arr['title'] = i.event_name
            start_date = datetime.datetime.strptime(str(i.start_date.date()), "%Y-%m-%d").strftime("%Y-%m-%d")
            event_sub_arr['start'] = start_date
            event_arr.append(event_sub_arr)
        return HttpResponse(json.dumps(event_arr))

    context = {
        "events":all_events,
        "get_event_types":get_event_types,

    }
    return render(request, 'upcoming/index.html', context)
