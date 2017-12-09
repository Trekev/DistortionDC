from django.db import models
from ckeditor_uploader.fields import RichTextUploadingField
# Create your models here.


class Show(models.Model):
    date = models.DateTimeField(auto_now=False)
    band = models.CharField(max_length=100)
    bandgenre = models.ForeignKey('genre', on_delete=models.CASCADE)
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

class Genre(models.Model):
    genre = models.CharField(max_length=100, default="Genre")

    def __str__(self):
        return self.genre
