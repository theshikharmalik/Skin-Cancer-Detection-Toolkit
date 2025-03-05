# skin-cancer-detection-toolkit
Optum global hackathon 2022 Runner Up 

## Overview

This is the source code for a skin cancer toolkit model in python which has been implemented with flask framework. The model has been built using **fastai** deep learning library which is a high level api for pytorch. The classifier has been trained using [Kaggle MNIST HAM10000 dataset](https://www.kaggle.com/kmader/skin-cancer-mnist-ham10000) which contains 10015 images of seven categories of pigmented skin lesions. As a preprocessing step, we have applied random undersampling to data to alleviate the class-imbalance problem. The classifier has been built with transfer learning technique using a pretrained **Densenet169** model. The final classifer achieved an accuracy of **91.2%** and a F1-score of **91.7%** on validation data.


## Dependencies

- Flask
- gunicorn
- numpy
- torch==1.0.0
- torchvision==0.2.1
- fastai==1.0.52
- Pillow==6.2.0
- Flask-Cors

## Instructions for python
First run `pip3 install -r requirements.txt` to install the required dependencies. Then launch the flask python app by running `python3 -m src.app`.

## Java app
This is the backend that contains our microservices for login and register. It is built using springboot.
Just import the dependencies and run the project.

## React app
This is the front-end of our application. It is built using react framework. You can naivgate to the specific react directory here and make sure node in installed in your system. After this run the following command : 

- npm install
- npm start

You can navigate to this address in your browser to see the work with the application : http://localhost:3000


