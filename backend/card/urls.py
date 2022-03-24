from django.urls import path
from . import views

urlpatterns = [
    path('api/card/<str:card_id>/', views.card_detail),
    path('api/character/<str:card_id>', views.voice),
    path('api/record/', views.record),
    path('api/test/', views.test),
]