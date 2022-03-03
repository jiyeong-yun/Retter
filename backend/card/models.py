from django.db import models

# Create your models here.
class Card(models.Model):
    id = models.CharField(primary_key=True, max_length=200)
    audio = models.CharField(max_length=200)
    image = models.CharField(max_length=200)
    video = models.CharField(max_length=200)
    