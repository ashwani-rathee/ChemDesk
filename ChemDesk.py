#ChemDesk


import tkinter as tk
import deepchem as dc
import warnings
from rdkit import Chem
# loading Python Imaging Library 
from PIL import ImageTk, Image
from tkinter import PhotoImage 
from tkinter import *
from tkinter import ttk
from tkinter import filedialog
# To get the dialog box to open when required  
from tkinter import filedialog 
warnings.filterwarnings("ignore")

print(dc.__version__)
root = tk.Tk()

photo = PhotoImage(file = "assets/icon/icon.png")
root.iconphoto(False, photo)
root.title('ChemDesk')
root.geometry("960x540")
root.resizable(0, 0)

# the label for user_name  
load_image = Label(root,  
                  text = "INPUT IMAGE").place(x = 10, 
                                           y = 10)   
input_image = Entry(root,width = 30).place(x =100,y=10)    
root.filename = filedialog.askopenfilename(initialdir="/home/ashwani/Desktop/ChemDesk/", title="Select A File", filetypes=(("png files", "*.png"),("all files", "*.*")))
tasks, datasets, transformers = dc.molnet.load_delaney(featurizer='GraphConv')
train_dataset, valid_dataset, test_dataset = datasets
print(test_dataset)
# Code to add widgets will go here...
root.mainloop()

