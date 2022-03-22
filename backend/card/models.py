from django.db import models

# Create your models here.
class Card(models.Model):
    card_id = models.UUIDField(primary_key=True)
    audio = models.FileField(upload_to="audio",  null=True)
    image = models.ImageField(upload_to="image",  null=True)
    video = models.FileField(upload_to="video",  null=True)
    