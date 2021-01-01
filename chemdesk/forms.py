# forms.py
from django import forms
from .models import *

class chemdeskform(forms.ModelForm):

	class Meta:
		model = chemdesk1
		fields = ['name', 'hotel_Main_Img']
