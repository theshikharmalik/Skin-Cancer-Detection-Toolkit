from __future__ import division, print_function
import json
from flask_cors import CORS
import os
import sys
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input
import numpy as np
from flask import Flask, request
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# model 1 - skin cancer types
model1 = load_model('models/EfficientNet90.h5')
labels1 = ['Actinic keratosis',
           'Basal cell carcinoma',
           'Benign keratosis',
           'Dermatofibroma',
           'Melanocytic nevus',
           'Melanoma',
           'Squamous cell carcinoma',
           'Vascular lesion']

# model 2 - skin diseases included
model2 = load_model('models/my_model.h5')
labels2 = ['Eczema',
           'Warts Molluscum',
           'Atopic Dermatitis',
           'Basal Cell Carcinoma',
           'Melanocytic Nevi',
           'Benign Keratosis',
           'Psoriasis pictures Lichen Planus',
           'Seborrheic Keratoses',
           'Tinea Ringworm Candidiasis',
           'Melanoma'
           ]


def format_output(prediction, labels):
    # formatting model's prediction np array to percentages and making key value pair with labels
    percentages = ["{:.1f}%".format(value) for value in [x * 100 for x in prediction[0]]]
    valuesarray = []
    for value in percentages:
        valuesarray.append(value)
    predictions = {labels[i]: valuesarray[i] for i in range(len(labels))}
    # sorting and reversing so that the highest value comes to the start of the list
    predictions_dict = dict(sorted(predictions.items(), key=lambda item: item[1]))
    final_classes = []
    for classvalue in predictions_dict:
        final_classes.append(classvalue)
    final_percents = []
    for values in predictions_dict:
        final_percents.append("{}".format(predictions_dict[values]))
    final_classes.reverse()
    final_percents.reverse()
    # final value
    predictions_json = {final_classes[i]: final_percents[i] for i in range(len(labels))}
    print(predictions_json)
    return predictions_json


def model_predict1(filename):
    img_path = 'tempStorage/' + filename
    img1 = load_img(img_path, target_size=(150, 150))
    img_array1 = img_to_array(img1)
    x_train1 = np.expand_dims(img_array1, axis=0)
    x_train1 = preprocess_input(x_train1)
    predictions1 = model1.predict(x_train1)
    predictions1 = format_output(predictions1, labels1)
    return json.dumps(predictions1)


def model_predict2(filename):
    img_path = 'tempStorage/' + filename
    img2 = load_img(img_path, target_size=(224, 224))
    img_array2 = img_to_array(img2)
    x_train2 = np.expand_dims(img_array2, axis=0)
    x_train2 = preprocess_input(x_train2)
    predictions2 = model2.predict(x_train2)
    predictions2 = format_output(predictions2, labels2)
    return json.dumps(predictions2)


@app.route('/upload', methods=["POST", "GET"])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        img = request.files['file']
        if img is not None:
            # saving image file in storage
            filename = secure_filename(img.filename)
            img.save(os.path.join('tempStorage', filename))
            # calling prediction function
            preds1 = model_predict1(filename)
            preds2 = model_predict2(filename)
            return preds1, preds2
    return 'OK'


if __name__ == '__main__':
    port = os.environ.get('PORT', 8008)
    if "prepare" not in sys.argv:
        app.run(debug=False, host='0.0.0.0', port=port)
