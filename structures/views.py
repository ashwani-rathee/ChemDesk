from django.shortcuts import render
from django.http import HttpResponse
from . import get_molecule
from django.shortcuts import render, redirect
from .forms import *
import os
from rdkit import Chem
import imolecule

def home(request):
    if request.method == 'POST':
        form = structuresform(request.POST, request.FILES)

        if form.is_valid():
            form.save()
            return redirect('data')
    else:
        form = structuresform()
    return render(request, 'home.html',{'form': form})
# Create your views here.
def index(request):
    return render(request, 'index.html')

def data(request):
    cmd = "java -jar ./structures/molvec-0.9.8-jar-with-dependencies.jar molvec -f ./structures/input/aldehyde.jpeg -o ./structures/result/aldehyde.mol"
    returned_value = os.system(cmd)
    m = Chem.MolFromMolFile('structures/result/aldehyde.mol')
    smile = Chem.MolToSmiles(m)
    return HttpResponse(smile)
def getmol(request):
    cmd = "java -jar ./structures/molvec-0.9.8-jar-with-dependencies.jar molvec -f ./structures/input/aldehyde.jpeg -o ./structures/result/aldehyde.mol"
    returned_value = os.system(cmd)
    print(returned_value)
    return HttpResponse('Success')

def moltosmile(request):
    m = Chem.MolFromMolFile('structures/result/aldehyde.mol')
    smile = Chem.MolToSmiles(m)
    print(smile)
    return HttpResponse(smile)

def moltopdb(request):
    m = Chem.MolFromMolFile('structures/result/aldehyde.mol')
    m = Chem.AddHs(m)
    x=Chem.rdmolfiles.MolToPDBFile(m, filename='aldehyde.pdb')
    print(x)
    return HttpResponse(x)

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
