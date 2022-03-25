from django.urls import path
from . import views
from . import synthesis
from retter.settings import MEDIA_ROOT
urlpatterns = [
    path('card/<str:card_id>/', views.card_delete),
    path('character/', views.create_card),
    path('record/', views.record),
 
    
]