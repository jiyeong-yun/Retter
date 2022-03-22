import uuid
from django.db import models

# Create your models here.
class Card(models.Model):
    card_id = models.IntegerField(primary_key=True, default=uuid.uuid4, editable=False)
    audio = models.FileField(upload_to="audio",  null=True)
    image = models.ImageField(upload_to="image",  null=True)
    video = models.CharField(null=True, max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
