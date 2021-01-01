from django.shortcuts import render
from django.http import HttpResponse
from . import get_molecule
from django.shortcuts import render, redirect
from .forms import *
import os
from rdkit import Chem

def home(request):
    return HttpResponse('<h1>Blog Home</h1>')
# Create your views here.
def getmol(request):
    cmd = "./structures/imago_console structures/input/data.png -o structures/result/data.mol"
    returned_value = os.system(cmd)
    print(returned_value)
    return HttpResponse('Success')

def moltosmile(request):
    m = Chem.MolFromMolFile('structures/result/data.mol')
    smile = Chem.MolToSmiles(m)
    print(smile)
    return HttpResponse(smile)


# Create your views here.
def structures_view(request):
    if request.method == 'POST':
        form = structuresform(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('success')
    else:
        form = structuresform()
    return render(request, 'form.html', {'form': form})


def success(request):
    return HttpResponse('successfully uploaded')

# Python program to view
# for displaying images

def display_hotel_images(request):

	if request.method == 'GET':

		# getting all the objects of hotel.
		Hotels = Hotel.objects.all()
		return render((request, 'display_hotel_images.html',
					{'hotel_images' : Hotels}))
