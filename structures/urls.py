from django.urls import path
from structures import views

urlpatterns = [
    path('', views.index, name='index'),
    path('input', views.getmol, name='getmol'),
    path('smile', views.moltosmile, name='moltosmile'),
    path('image_upload', views.structures_view, name='image_upload'),
    path('success', views.success, name='success'),
    path('data',views.data,name='data'),
    path('moltopdb',views.moltopdb,name='moltopdb'),
    path('periodic_table',views.periodic_table,name='periodic_table'),
    path('viewer',views.viewer,name='viewer'),
]
