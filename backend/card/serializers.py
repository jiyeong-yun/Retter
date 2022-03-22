from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(use_url=True)
    audio = serializers.FileField(use_url=True)

    class Meta:
        model = Card
        fields = ('card_id', 'image', 'audio', 'video')