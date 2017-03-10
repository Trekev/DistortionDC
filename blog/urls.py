from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.BlogIndex.as_view(), name='blogindex'),
    url(r'^allblog$', views.BlogAll.as_view(), name='allblog'),
    url(r'^entry/(?P<slug>\S+)$', views.BlogDetail.as_view(), name="entry_detail"),
]
