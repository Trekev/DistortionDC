from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
# Create your models here.


class Show(models.Model):
    date = models.DateTimeField()
    band = models.CharField(max_length=100)
    youtube = models.CharField(max_length=200)
    soundcloud = models.CharField(max_length=200)
    spotify = models.CharField(max_length=200)
    minprice = models.IntegerField()
    maxprice = models.IntegerField()
    bandgenre = models.ForeignKey('Genre', models.DO_NOTHING)
    venue = models.ForeignKey('Venue', models.DO_NOTHING)
    ticketmaster_id = models.CharField(unique=True, max_length=200, blank=True, null=True)
    artist_id = models.CharField(max_length=200, blank=True, null=True)
    genres = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'upcoming_show'

    def __str__(self):
        return self.band + " @ " + self.venue.Name

class Venue(models.Model):
    Name = models.CharField(max_length=100)
    description = RichTextUploadingField(config_name='awesome_ckeditor', default='Literally ANYTHING')
    def __str__(self):
        return self.Name

class Genre(models.Model):
    genre = models.CharField(max_length=100, default="Genre")

    def __str__(self):
        return self.genre
