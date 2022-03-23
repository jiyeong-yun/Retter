from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)
    audio = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = Card
        fields = ('card_id', 'text', 'image', 'audio', 'video')