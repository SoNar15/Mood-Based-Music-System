# Mood-Based Music System Using Computer Vision

**Mood Based Music Recommendation System** is an AI-powered music recommendation system that tunes into emotions using computer vision. By analyzing facial expressions through real-time image capture, the system detects the user's mood and plays music accordingly. It offers a seamless experience by integrating a camera module (ESP32-CAM) and machine learning for emotion detection.

---

Note: This project was originally developed in collaboration on a teammate’s repository. I’ve forked it here to showcase my contributions and make it easily accessible for review.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Introduction

This project combines **computer vision** and **AI** to recommend music based on facial expressions. When the user captures a photo, the system uses a **Convolutional Neural Network (CNN)** to predict the emotion from the image. Based on the detected emotion (angry, happy, sad, etc.), it suggests a playlist that matches the mood.

---

## Features

- **Emotion detection** from facial expressions using a CNN model.
- **Music recommendation** based on detected emotions.
- **Real-time image capture** using the ESP32-CAM.
- **Seamless frontend-backend integration** using **Tailwind CSS** for design and **Express.js** for API routing.

---

## Tech Stack

- **Frontend**:
  - HTML, CSS, JavaScript
  - Tailwind CSS for styling
- **Backend**:
  - Node.js with Express.js
  - local storage for image storage (non-permanent)
  - local storage for storing songs
- **Machine Learning**:
  - Keras with TensorFlow for emotion detection
  - Pre-trained CNN model on the FER2013 dataset
- **Camera**:
  - ESP32-CAM module for capturing photos
- **Deployment**:
  - Soon to be deployed

---

## How It Works

1. **Image Capture**:
   - The user clicks the "Capture" button on the website to capture their photo.
   - The image is sent to the server through the **ESP32-CAM** module.
2. **Emotion Detection**:
   - The backend processes the image and uses a pre-trained **CNN model** to detect the emotion from the image.
   - The model returns one of the 7 emotion labels: `angry`, `disgust`, `fear`, `happy`, `neutral`, `sad`, `surprise`.
3. **Music Recommendation**:
   - Based on the detected emotion, the system finds suitable songs linked to that emotion.
   - The songs are played to match the user's mood.

---

## Installation

### Prerequisites

1. **Node.js** and **npm** installed on your system.
2. **Python 3.x** installed for running the emotion detection script.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/GitSoham02/Mood-Based-Music-System.git
   cd Mood-Based-Music-System
   ```

2. Install backend dependencies:

   ```bash
   npm install
   ```

3. Install Python dependencies (for emotion detection):

   ```bash
   pip install -r backend/requirements.txt
   ```

4. Start the server:

   ```bash
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Usage

1. Go to the capturePhoto page and click **"Capture Photo"** to take a picture.
2. The photo is sent to the server, and emotion detection begins.
3. Based on the detected emotion, the backend returns a song, and music starts playing accordingly.

---

## Project Structure

```
MoodBasedMusicSystem/
├── backend/                  # Backend server and emotion detection
│   ├── controllers/          # Handling controllers
│   ├── esp32cam/             # Handling esp32cam backend process
│   ├── routes/               # Handling routes (photo, songs)
│   ├── models/               # Database models
│   ├── python/               # Emotion detection script (Python)
│   ├── db.js                 # Database connection configuration
│   ├── server.js             # Express server entry point
│   └── requirements.txt      # Python dependencies
│   └── public/               # Frontend files
│   └── songs/                # mp3 songs
│   └── uploads/              # esp32cam captured photo
├── src/                      # Frontend source files (HTML, CSS)
├── package.json              # Node.js dependencies
└── README.md                 # Project documentation
```

---

## Contributing

Contributions are welcome! Feel free to fork the project, create a branch, and submit a pull request. Please make sure to follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your fork (`git push origin feature-branch`).
5. Submit a pull request with a detailed description of your changes.

---


## Acknowledgements

- **FER2013 Dataset**: Used for training the emotion detection model.
- **ESP32-CAM**: For capturing images to detect emotions.
- **TensorFlow & Keras**: For the deep learning model used for emotion detection
