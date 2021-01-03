# ChemDesk
Chemoinformatics is an established discipline focusing on extracting, processing and extrapolating meaningful data from chemical structures. With the rapid explosion of chemical ‘big’ data from HTS and combinatorial synthesis, machine learning has become an indispensable tool for drug designers to mine chemical information from large compound databases to design drugs with important biological properties. 

ChemDesk is a tool that can be used to see details about a particular compound of interest:
It provides many other interesting functionality like:
- Periodic Table
- Structure Comparison
- Ring Search,SSSR search,Aromatic Search
- 3D viewer
And Last but not least :
Benzene Pong

## Setup
Let's get you started with this interesting project of ours:

To run this project locally, follow the steps:

Solves general chemical problems
Ubuntu 20.04 focal fossa with python.3.8
- Install Anaconda
wget -P /tmp https://repo.anaconda.com/archive/Anaconda3-2020.02-Linux-x86_64.sh
bash /tmp/Anaconda3-2020.02-Linux-x86_64.sh
source ~/.bashrc
 Accept the conda init prompt and this should install conda
 
- Create a environment with 
conda create --name chemdesk python=3.7
conda activate chemdesk

- Install Django and you 
pip install django
pip install pubchempy
conda install -c conda-forge rdkit
git clone https://github.com/ashwani-rathee/ChemDesk.git
cd ChemDesk/
python manage.py makemigrations
python manage.py migrate
python manage.py runserver

References:

