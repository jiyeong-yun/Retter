from rest_framework import serializers
from .models import Card

class CardSerializer(serializers.HyperlinkedModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)
    audio = serializers.FileField(use_url=True, required=False)

    class Meta:
        model = Card
        fields = ('card_id', 'text', 'image', 'audio', 'video', 'myvoice')

class AudioSerializer(serializers.HyperlinkedModelSerializer):
    myvoice = serializers.FileField(use_url=True)
    class Meta:
        model = Card
        fields = ('card_id', 'myvoice')

class CardCreateSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Card
        fields = ('text', 'voice_num', 'audio', 'card_id')
        read_only_fields = ('audio', 'card_id')


