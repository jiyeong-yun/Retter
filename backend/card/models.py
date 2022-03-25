import uuid
from django.db import models
def user_directory_path(instance, filename):
    return '{}/{}'.format(str(instance.card_id).replace('-', ''), filename)
# Create your models here.
class Card(models.Model):
    card_id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    text = models.CharField(max_length=500, null=True)
    audio = models.CharField(null=True, max_length=200)
    myvoice = models.FileField(upload_to=user_directory_path,  null=True)
    image = models.ImageField(upload_to="image",  null=True)
    video = models.CharField(null=True, max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
