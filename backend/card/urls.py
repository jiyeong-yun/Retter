from django.urls import path
from . import views

urlpatterns = [
    path('api/card/<str:card_id>/', views.card_detail),
    path('api/character/<int:voice_num>', views.voice),
    path('api/record/', views.record),
    path('api/test/', views.test),
]