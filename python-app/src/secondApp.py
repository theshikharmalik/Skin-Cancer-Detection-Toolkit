from tensorflow.keras.models import load_model
from tensorflow.keras.utils import load_img, img_to_array
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image

model = load_model('models/my_model.h5')
# print(model.summary())


labels = ['Eczema',
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

# img = Image.open(r'melanoma_sample.jpeg')
img_path = 'photosCorrect/ISIC_keratosis1_both.jpeg'
img = load_img(img_path, target_size=(224, 224))
# plt.imshow(image_loaded)
# plt.show()
img_array = img_to_array(img)

x_train = np.expand_dims(img_array, axis=0)
x_train = preprocess_input(x_train)

# print(x_train.shape)

predictions = model.predict(x_train)
print(predictions)
class_id = np.argmax(predictions, axis=1)
print(class_id)
# print(predictions.shape)
# predictionLabel = decode_predictions(predictions, top = 1)
print(labels)
print(labels[class_id.item()])

percentages = ["{:.1f}%".format(value) for value in [x * 100 for x in predictions[0]]]
print(percentages)


