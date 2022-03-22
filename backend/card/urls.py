from django.urls import path
from . import views

urlpatterns = [
    path('card/<str:card_id>/', views.card_delete),
    path('character/<int:voice_num>', views.voice),
    path('record/', views.record)
]