from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from card.models import Card

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from moviepy.editor import *
from retter.settings import MEDIA_ROOT
# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def card_delete(request, card_id):
    card = get_object_or_404(Card, pk=card_id)
    if request.method == 'DELETE':
        if request.data.card_id == card.card_id:
            card.delete()
            data = {
                'delete': f'카드 {card_id}가 삭제되었습니다.'
            }
        return Response(data, status=status.HTTP_204_NO_CONTENT)
    if request.method == 'POST':
        card.image = request.FILES['image']
        card.audio = request.FILES['audio']
        card.save()
      
        audio_clip = AudioFileClip(MEDIA_ROOT + "\\audio\\" + card.audio.name[6:])
        image_clip = ImageClip(MEDIA_ROOT + "\\image\\" + card.image.name[6:])
        
        video_clip = image_clip.set_audio(audio_clip)
        video_clip.duration = audio_clip.duration
        video_clip.write_videofile(MEDIA_ROOT + "\\video\\" + card_id + ".mp4",  codec='mpeg4', audio_codec="aac", fps=24)
        
        # response = HttpResponse(video, content_type="video/mp4")
        # response['Content-Disposition'] = 'attachment; filename=test.mp4'
        return Response()

    if request.method == 'GET':
        pass


@api_view(['GET', 'POST'])
def voice(request, voice_num):
    if request.method == 'GET':
        pass
    elif request.method == 'POST':
        pass


@api_view(['POST'])
def record(request):
    pass