from django.urls import path
from structures import views

urlpatterns = [
    path('', views.home, name='chem-desk'),
    path('input', views.getmol, name='getmol'),
    path('index', views.index, name='index'),
    path('smile', views.moltosmile, name='moltosmile'),
    path('image_upload', views.structures_view, name='image_upload'),
    path('success', views.success, name='success'),
    path('data',views.data,name='data'),
    path('hotel_images', views.display_hotel_images, name = 'hotel_images'),
    path('moltopdb',views.moltopdb,name='moltopdb'),
    path('structures_compare' ,views.structure_compare,name='structure_compare'),
    path('periodic_table',views.periodic_table,name='periodic_table'),
    path('viewer',views.viewer,name='viewer'),
]
