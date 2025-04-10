import cv2
import numpy as np
from tensorflow.keras.models import load_model
import os
import sys
import json

# Constants
# MODEL_PATH = "FER_model.h5"
# IMAGE_PATH = os.path.join("..", "uploads", "latest.jpg")
# HAAR_PATH = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"

# Get absolute path to the script's directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Now build full paths
MODEL_PATH = os.path.join(BASE_DIR, "FER_model.h5")
IMAGE_PATH = os.path.join(BASE_DIR, "..", "uploads", "latest.jpg")
HAAR_PATH = cv2.data.haarcascades + "haarcascade_frontalface_default.xml"

# Emotion label mapping (adjust if needed)
emotion_dict = {
    0: "Angry", 1: "Disgusted", 2: "Fearful", 3: "Happy",
    4: "Neutral", 5: "Sad", 6: "Surprised"
}


def main():
    # Check if model and image exist
    # if not os.path.exists(MODEL_PATH):
    #     print(json.dumps({"error": "Model file not found."}))
    #     return

    # if not os.path.exists(IMAGE_PATH):
    #     print(json.dumps({"error": "Image file not found."}))
    #     return

    # model = load_model(MODEL_PATH)

    # face_cascade = cv2.CascadeClassifier(HAAR_PATH)
    # img = cv2.imread(IMAGE_PATH)
    # gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # faces = face_cascade.detectMultiScale(
    #     gray, scaleFactor=1.3, minNeighbors=5)

    # if len(faces) == 0:
    #     print(json.dumps({"emotion": "happy"}))
    # else: removed temporarily ** TO BE ADDED AGAIN **
    # for (x, y, w, h) in faces:
    #     roi_gray = gray[y:y+h, x:x+w]
    #     try:
    #         cropped_img = cv2.resize(roi_gray, (48, 48))
    #     except:
    #         continue

    #     cropped_img = cropped_img.astype("float32") / 255.0
    #     cropped_img = np.expand_dims(np.expand_dims(cropped_img, -1), 0)

    #     prediction = model.predict(cropped_img)
    #     max_index = int(np.argmax(prediction))
    #     emotion = emotion_dict.get(max_index, "Unknown")

    #     print(json.dumps({"emotion": emotion}))
    # return

    # Bypass actual detection and return a mock emotion
    print(json.dumps({"emotion": "Happy"}))


if __name__ == "__main__":
    main()
