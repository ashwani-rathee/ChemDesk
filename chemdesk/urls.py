from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='chem-desk'),
    path('input', views.getmol, name='getmol'),
    path('smile', views.moltosmile, name='moltosmile'),
    path('image_upload', views.chemdesk_view, name='image_upload'),
    path('success', views.success, name='success'),
    path('hotel_images', views.display_hotel_images, name = 'hotel_images'),
]
