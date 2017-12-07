from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
# Create your models here.
class Events(models.Model):
    even_id = models.AutoField(primary_key=True)
    event_name = models.CharField(max_length=255,null=True,blank=True)
    start_date = models.DateTimeField(null=True,blank=True)
    end_date = models.DateTimeField(null=True,blank=True)
    event_type = models.CharField(max_length=10,null=True,blank=True)
    url = models.CharField(max_length=255,null=True,blank=True)

    def __str__(self):
        return self.event_name

class Show(models.Model):
    date = models.DateTimeField(auto_now=False)
    band = models.CharField(max_length=100)
    bandgenre = models.CharField(max_length=50)
    youtube = models.URLField(blank=True)
    soundcloud = models.URLField(blank=True)
    spotify = models.URLField(blank=True)
    venue = models.ForeignKey('Venue', on_delete=models.CASCADE)
    minprice = models.PositiveIntegerField()
    maxprice = models.PositiveIntegerField()

    def __str__(self):
        return self.band + " @ " + self.venue.Name

class Venue(models.Model):
    Name = models.CharField(max_length=100)
    description = RichTextUploadingField(config_name='awesome_ckeditor', default='Literally ANYTHING')
    def __str__(self):
        return self.Name
