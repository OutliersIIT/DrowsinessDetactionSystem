# -*- coding: utf-8 -*-
# referenced - https://www.pyimagesearch.com/2017/05/08/drowsiness-detection-opencv/

from scipy.spatial import distance as dist
from imutils.video import VideoStream
from imutils import face_utils
from threading import Thread
import numpy as np
import argparse
import imutils
import time
import dlib
import cv2
import os
import matplotlib.pyplot as plt
from PIL import Image
import base64
from flask import Flask, request, Response, jsonify, render_template
import jsonpickle
from flask_cors import CORS
# import streamlit as st

def eyeRatio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])

    C = dist.euclidean(eye[0], eye[3])

    ear = (A + B) / (2.0 * C)

    return ear

def finalEarShape(shape):
    (lStart, lEnd) = face_utils.FACIAL_LANDMARKS_IDXS["left_eye"]
    (rStart, rEnd) = face_utils.FACIAL_LANDMARKS_IDXS["right_eye"]

    leftEye = shape[lStart:lEnd]
    rightEye = shape[rStart:rEnd]

    leftEAR = eyeRatio(leftEye)
    rightEAR = eyeRatio(rightEye)

    ear = (leftEAR + rightEAR) / 2.0
    return (ear, leftEye, rightEye)

def lipsDistance(shape):
    top_lip = shape[50:53]
    top_lip = np.concatenate((top_lip, shape[61:64]))

    low_lip = shape[56:59]
    low_lip = np.concatenate((low_lip, shape[65:68]))

    top_mean = np.mean(top_lip, axis=0)
    low_mean = np.mean(low_lip, axis=0)

    distance = abs(top_mean[1] - low_mean[1])
    return distance

# def readb64(uri):
#    encoded_data = uri.split(',')[1]
#    nparr = np.frombuffer(base64.b64decode(encoded_data), np.uint8)
#    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
#    return img


def detectDrowsiness():
    ap = argparse.ArgumentParser()
    ap.add_argument("-w", "--webcam", type=int, default=0,
                    help="index of webcam on system")
    args = vars(ap.parse_args())

    EYE_AR_THRESH = 0.3
    # EYE_AR_CONSEC_FRAMES = 30
    EYE_AR_CONSEC_FRAMES = 3
    YAWN_THRESH = 20
    alarm_status = False
    alarm_status2 = False
    saying = False
    COUNTER = 0
    YAWN_COUNT = 0
    data1 = "NO DROWSINESS"
    data2 = "NO YAWNING"

    #  Loading the predictor and detector...
    detector = cv2.CascadeClassifier("haarcascade_frontalface_default.xml")    #Faster but less accurate
    predictor = dlib.shape_predictor('shape_predictor_68_face_landmarks.dat')


    time.sleep(1.0)

    image_array = [] #array which ll hold the images

    img1 = Image.open("Images/image1.jpg") 
    img2 = Image.open("Images/image2.jpg") 
    img3 = Image.open("Images/image3.jpg") 
    img4 = Image.open("Images/image4.jpg") 
    img5 = Image.open("Images/image5.jpg") 
    img6 = Image.open("Images/image6.jpg") 
    img7 = Image.open("Images/image7.jpg") 
    img8 = Image.open("Images/image8.jpg") 
    img9 = Image.open("Images/image9.jpg") 
    img10 = Image.open("Images/image10.jpg") 
    # img1 = "Images/image1.jpg"
    # img2 = "Images/image2.jpg"
    # img3 = "Images/image3.jpg"
    # img4 = "Images/image4.jpg"
    # img5 = "Images/image5.jpg"
    # img6 = "Images/image6.jpg"
    # img7 = "Images/image7.jpg"
    # img8 = "Images/image8.jpg"
    # img9 = "Images/image9.jpg"
    # img10 = "Images/image10.jpg"

    image_array.append(img1) # append each image to array
    image_array.append(img2)
    image_array.append(img3)
    image_array.append(img4)
    image_array.append(img5)
    image_array.append(img6)
    image_array.append(img7)
    image_array.append(img8)
    image_array.append(img9)
    image_array.append(img10)


    # data_uri_img = ''
    # img = readb64(data_uri_img)
    # cv2.imshow("uriTest", img)

    # datURI_array = []
    # datURL_array.append("")

    for i in range(len(image_array)): 

        # detectImg = vs.read()
        # detectImg = cv2.imread('myOpenEye.jpg')

        # detectImg = cv2.imread(image_array[i])  //real

        # detectImg = cv2.imdecode()
        detectImg = np.asarray(image_array[i])

        detectImg = imutils.resize(detectImg, width=450)
        gray = cv2.cvtColor(detectImg, cv2.COLOR_BGR2GRAY)

        #rects = detector(gray, 0)
        rects = detector.detectMultiScale(gray, scaleFactor=1.1, 
            minNeighbors=5, minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE)

        #for rect in rects:
        for (x, y, w, h) in rects:
            rect = dlib.rectangle(int(x), int(y), int(x + w),int(y + h))
            
            shape = predictor(gray, rect)
            shape = face_utils.shape_to_np(shape)

            eye = finalEarShape(shape)
            ear = eye[0]
            leftEye = eye [1]
            rightEye = eye[2]

            distance = lipsDistance(shape)

            leftEyeHulls = cv2.convexHull(leftEye)
            rightEyeHulls = cv2.convexHull(rightEye)
            cv2.drawContours(detectImg, [leftEyeHulls], -1, (0, 255, 0), 1)
            cv2.drawContours(detectImg, [rightEyeHulls], -1, (0, 255, 0), 1)

            lip = shape[48:60]
            cv2.drawContours(detectImg, [lip], -1, (0, 255, 0), 1)

            if ear < EYE_AR_THRESH:
                COUNTER += 1
                YAWN_COUNT += 1


                if COUNTER >= EYE_AR_CONSEC_FRAMES:
                    

                    cv2.putText(detectImg, "DROWSINESS ALERT!", (10, 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
                    data1 = "DROWSINESS ALERT!"

            else:
                COUNTER = 0
                

            if (distance > YAWN_THRESH):
                    cv2.putText(detectImg, "Yawn Alert", (10, 30),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)

                    data2 = "Yawn Alert"

            cv2.putText(detectImg, "EAR: {:.2f}".format(ear), (300, 30),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)
            cv2.putText(detectImg, "YAWN: {:.2f}".format(distance), (300, 60),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 255), 2)


        # cv2.imshow("Frame", detectImg)
        # key = cv2.waitKey(1) & 0xFF

        # if key == ord("q"):
        #     break

    print(data1) 
    print(data2)       

    # return data1

# app = Flask(__name__)

# response = [
#     {'data1' : data1},
#     {'data2' : data2}
# ]

# # response_pickled = jsonpickle.encode(response)

# books = [
#     {
#         'id': 1,
#         'name': 'Senani'
#     }
# ]

# @app.route('/upload/images', methods=['POST'])
# def api_call():
#     return Response(response="Test Response", status=200, mimetype="application/json")

# app.debug = True
# app.run(host="127.0.0.1", port=5000)
# # app.run(debug True)

app = Flask(__name__)
cors = CORS(app)
app.config["DEBUG"] = True

# Create some test data for our catalog in the form of a list of dictionaries.
books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Distant Reading Archive</h1>
<p>A prototype API for distant reading of science fiction novels.</p>'''

@app.route('/')
def index():
    return render_template(index.html)

# A route to return all of the available entries in our catalog.
@app.route('/api/v1/resources/books/all', methods=['POST', 'GET'])
def api_all():
    if request.method == 'POST':
        # f = request.files['file']
        # f = request.form['picture']
        # detectDrowsiness()
        return jsonify(books)

    return "Test response"

app.run()