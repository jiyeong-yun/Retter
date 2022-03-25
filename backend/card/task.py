from datetime import datetime, timedelta
from pytz import timezone
from background_task import background
from django.shortcuts import get_list_or_404
from card.models import Card
from background_task.models import Task
from retter.settings import MEDIA_ROOT
import shutil

@background(schedule=datetime.now().replace(hour=00, minute=00, second=00, microsecond=000000))
def card_delete():
    cards = Card.objects.all()
    for card in cards:
        if card.created_at.replace(tzinfo=None) + timedelta(days=7) <= datetime.now().replace(hour=00, minute=00, second=00):
            shutil.rmtree(MEDIA_ROOT + '\\' + str(card.card_id).replace('-', ''))
            card.delete()
            print('delete card')
        else:
            print('false')