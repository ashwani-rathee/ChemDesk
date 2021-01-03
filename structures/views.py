from django.shortcuts import render
from django.http import HttpResponse
from django.conf import settings
from django.core.files.storage import FileSystemStorage
from . import get_molecule
from django.shortcuts import render, redirect
from .forms import *
from rdkit import Chem
import os

# Create your views here.
def index(request):
    if request.method == 'POST' and request.FILES['myfile']:
        myfile = request.FILES['myfile']
        fs = FileSystemStorage()
        filename = fs.save(myfile.name, myfile)
        return redirect('viewer')
    return render(request, 'structures/index.html')

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

def structure_compare(request):
    return render(request,'structures/structure_compare.html')

def periodic_table(request):
    return render(request,'structures/periodic_table.html')

def viewer(request):
    return render(request,'structures/viewer.html')