from django.db import models

# Create your models here.
# models.py
class structures1(models.Model):
	name = models.CharField(max_length=50)
	chemical_img = models.ImageField(upload_to='images/')
