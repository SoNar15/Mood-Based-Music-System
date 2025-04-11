import sys
import os
import cv2
import numpy as np
from keras.models import load_model
import json

from utils.datasets import get_labels
from utils.inference import detect_faces, draw_text, draw_bounding_box, apply_offsets, load_detection_model, load_image
from utils.preprocessor import preprocess_input

base_path = os.path.abspath(os.path.dirname(__file__))
image_path = os.path.join(base_path, '..', 'uploads', 'latest.jpg')
detection_model_path = os.path.join(
    base_path, 'haarcascade_frontalface_default.xml')
emotion_model_path = os.path.join(base_path, 'model.hdf5')

emotion_labels = get_labels('fer2013')
emotion_offsets = (0, 0)

face_detection = load_detection_model(detection_model_path)
emotion_classifier = load_model(emotion_model_path, compile=False)
emotion_target_size = emotion_classifier.input_shape[1:3]

rgb_image = load_image(image_path, grayscale=False)
gray_image = load_image(image_path, grayscale=True)
gray_image = np.squeeze(gray_image).astype('uint8')

faces = detect_faces(face_detection, gray_image)
for face_coordinates in faces:
    x1, x2, y1, y2 = apply_offsets(face_coordinates, emotion_offsets)
    gray_face = gray_image[y1:y2, x1:x2]

    try:
        gray_face = cv2.resize(gray_face, emotion_target_size)
    except:
        continue

    gray_face = preprocess_input(gray_face, True)
    gray_face = np.expand_dims(gray_face, 0)
    gray_face = np.expand_dims(gray_face, -1)
    emotion_label_arg = np.argmax(
        emotion_classifier.predict(gray_face, verbose=0))
    emotion_text = emotion_labels[emotion_label_arg]

    color = (255, 0, 0)
    draw_bounding_box(face_coordinates, rgb_image, color)
    draw_text(face_coordinates, rgb_image, emotion_text, color, 0, -20, 1, 2)
    # print(f"✅ Detected Emotion: {emotion_text}")
    print(json.dumps({"emotion": emotion_text}))

bgr_image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR)
cv2.imwrite(os.path.join(base_path, "images",
            'predicted_test_image.png'), bgr_image)


# import sys
# import cv2
# from keras.models import load_model
# import numpy as np

# from utils.datasets import get_labels
# from utils.inference import detect_faces
# from utils.inference import draw_text
# from utils.inference import draw_bounding_box
# from utils.inference import apply_offsets
# from utils.inference import load_detection_model
# from utils.inference import load_image
# from utils.preprocessor import preprocess_input

# # parameters for loading data and images
# image_path = sys.argv[1]
# detection_model_path = 'haarcascade_frontalface_default.xml'
# emotion_model_path = 'model.hdf5'
# # gender_model_path = 'simple_CNN.81-0.96.hdf5'

# emotion_labels = get_labels('fer2013')
# # gender_labels = get_labels('imdb')
# font = cv2.FONT_HERSHEY_SIMPLEX

# # hyper-parameters for bounding boxes shape
# # gender_offsets = (10, 10)
# emotion_offsets = (0, 0)

# # loading models
# face_detection = load_detection_model(detection_model_path)
# emotion_classifier = load_model(emotion_model_path, compile=False)
# # gender_classifier = load_model(gender_model_path, compile=False)

# # getting input model shapes for inference
# emotion_target_size = emotion_classifier.input_shape[1:3]
# # gender_target_size = gender_classifier.input_shape[1:3]

# # loading images
# rgb_image = load_image(image_path, grayscale=False)
# gray_image = load_image(image_path, grayscale=True)
# gray_image = np.squeeze(gray_image)
# gray_image = gray_image.astype('uint8')

# faces = detect_faces(face_detection, gray_image)
# for face_coordinates in faces:
#     # x1, x2, y1, y2 = apply_offsets(face_coordinates, gender_offsets)
#     # rgb_face = rgb_image[y1:y2, x1:x2]

#     x1, x2, y1, y2 = apply_offsets(face_coordinates, emotion_offsets)
#     gray_face = gray_image[y1:y2, x1:x2]

#     try:
#         # rgb_face = cv2.resize(rgb_face, gender_target_size)
#         gray_face = cv2.resize(gray_face, emotion_target_size)
#     except:
#         continue

#     # rgb_face = preprocess_input(rgb_face, False)
#     # rgb_face = np.expand_dims(rgb_face, 0)
#     # gender_prediction = gender_classifier.predict(rgb_face)
#     # gender_label_arg = np.argmax(gender_prediction)
#     # gender_text = gender_labels[gender_label_arg]

#     gray_face = preprocess_input(gray_face, True)
#     gray_face = np.expand_dims(gray_face, 0)
#     gray_face = np.expand_dims(gray_face, -1)
#     emotion_label_arg = np.argmax(emotion_classifier.predict(gray_face))
#     emotion_text = emotion_labels[emotion_label_arg]

#     color = (255, 0, 0)
#     draw_bounding_box(face_coordinates, rgb_image, color)
#     draw_text(face_coordinates, rgb_image, emotion_text, color, 0, -20, 1, 2)
#     print(f"Detected emotion: {emotion_text}")

#     # print(f"✅ Detected Gender: {gender_text}")
#     print(f"✅ Detected Emotion: {emotion_text}")

# bgr_image = cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR)
# cv2.imwrite('./images/predicted_test_image.png', bgr_image)
