from datetime import datetime
from apscheduler.schedulers.background import BlockingScheduler
from django.conf import settings
from apscheduler.executors.pool import ProcessPoolExecutor, ThreadPoolExecutor
from django_apscheduler.jobstores import register_events, DjangoJobStore
import time
from .views import card_delete

def start():
    scheduler = BlockingScheduler()
    scheduler.add_jobstore(DjangoJobStore(), 'djangojobstore')
    register_events(scheduler)
    @scheduler.scheduled_job('cron', minute='*/5', name='auto_delete')
    def auto_delete():
        card_delete()
    scheduler.start()