from django.urls import path
from structures import views

urlpatterns = [
    path('', views.home, name='chem-desk'),
    path('input', views.getmol, name='getmol'),
    path('smile', views.moltosmile, name='moltosmile'),
    path('image_upload', views.structures_view, name='image_upload'),
    path('success', views.success, name='success'),
    path('data',views.data,name='data'),
    path('hotel_images', views.display_hotel_images, name = 'hotel_images'),
]
