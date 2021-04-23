from django.shortcuts import render
from django.http import HttpResponse
import pandas as pd

from sklearn.externals import joblib

loadModel = joblib.load('./model/ML.pkl')

from pymongo import MongoClient

client = MongoClient('localhost',27017)
db = client['mpgDataBase']
collection = db['mpgTable']

def index(request):
    return render(request,'index.html',context)

def predictMPG(request):
    if request.method == 'POST':
        temp={}
        temp['age'] = request.POST.get('age')
        temp['gender'] = request.POST.get('gender')

    testDtaa = pd.DataFrame({'x':temp}).transpose()
    heartRate=reloadModel.predict(testDtaa)[0]
    if current<heartRate{
        passWarning()
    } else {
        continue
    }
    return render(request,'index.html',context)

def viewData(request):
    return none

def updateData(request):

