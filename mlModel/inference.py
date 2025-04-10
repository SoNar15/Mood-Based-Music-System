import cv2
import numpy as np
import mediapipe as mp
from tensorflow.keras.models import load_model


# Load the trained model and labels
model = load_model("model.h5")
label = np.load("labels.npy")

# Initialize MediaPipe holistic model
holistic = mp.solutions.holistic
holis = holistic.Holistic(static_image_mode=True)

def process_image(image_path):
    lst = []

    frm = cv2.imread(image_path)
    if frm is None:
        return {"error": "Image not found or unreadable."}

    res = holis.process(cv2.cvtColor(frm, cv2.COLOR_BGR2RGB))

    if res.face_landmarks:
        for i in res.face_landmarks.landmark:
            lst.append(i.x - res.face_landmarks.landmark[1].x)
            lst.append(i.y - res.face_landmarks.landmark[1].y)

        if res.left_hand_landmarks:
            for i in res.left_hand_landmarks.landmark:
                lst.append(i.x - res.left_hand_landmarks.landmark[8].x)
                lst.append(i.y - res.left_hand_landmarks.landmark[8].y)
        else:
            lst.extend([0.0] * 42)

        if res.right_hand_landmarks:
            for i in res.right_hand_landmarks.landmark:
                lst.append(i.x - res.right_hand_landmarks.landmark[8].x)
                lst.append(i.y - res.right_hand_landmarks.landmark[8].y)
        else:
            lst.extend([0.0] * 42)

        lst = np.array(lst).reshape(1, -1)
        pred_index = np.argmax(model.predict(lst))
        pred_label = label[pred_index]
        return {"prediction": pred_label}

    return {"error": "No face detected in the image."}
