from keras.preprocessing import image
from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import matplotlib.pyplot as plt
import numpy as np

from PIL import Image
model = load_model('models/EfficientNet90.h5')
# print(model.summary())


labels = ['Actinic keratosis',
'Basal cell carcinoma',
'Benign keratosis',
'Dermatofibroma',
'Melanocytic nevus',
'Melanoma',
'Squamous cell carcinoma',
'Vascular lesion']

# img = Image.open(r'melanoma_sample.jpeg')
img_path = 'photosCorrect/ISIC_keratosis1_both.jpeg'
img = load_img(img_path, target_size=(150, 150))
print(type(img))
# plt.imshow(image_loaded)
# plt.show()
img_array = img_to_array(img)

x_train = np.expand_dims(img_array, axis=0)
x_train = preprocess_input(x_train)

# print(x_train.shape)

predictions = model.predict(x_train)
print(predictions)
class_id = np.argmax(predictions, axis = 1)
print(class_id)
# print(predictions.shape)
# predictionLabel = decode_predictions(predictions, top = 1)
print(labels)
print(labels[class_id.item()])

percentages = ["{:.1f}%".format(value) for value in [x * 100 for x in predictions[0]]]
print(percentages)
# 4 - actinic
# 7 - vascular

valuesarray = []
for value in percentages:
    #value = value.numpy()
    # print(value)
    valuesarray.append(value)

print(valuesarray)
predictions = {labels[i] : valuesarray[i] for i in range(len(labels))}
print(predictions)
predictions_new = dict(sorted(predictions.items(), key=lambda item: item[1]))
print(predictions_new)
print(type(predictions_new))

final_classes =[]
for classvalue in predictions_new:
    final_classes.append(classvalue)

final_percents = []
for values in predictions_new:
    final_percents.append("{}%".format(predictions_new[values]))

final_classes.reverse()
final_percents.reverse()
predictions_json_new = {final_classes[i] : final_percents[i] for i in range(len(labels))}
print(predictions_json_new)
