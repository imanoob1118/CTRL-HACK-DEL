#!/usr/bin/env python
# -*- coding: utf-8 -*-
import csv
import copy
import argparse
import itertools
from collections import deque
import cv2 as cv

from model import KeyPointClassifier
from model import PointHistoryClassifier

import numpy as np
import mediapipe as mp

# Define history_length
history_length = 16

def get_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("--min_detection_confidence",
                        help='min_detection_confidence',
                        type=float,
                        default=0.7)
    parser.add_argument("--min_tracking_confidence",
                        help='min_tracking_confidence',
                        type=int,
                        default=0.5)

    args = parser.parse_args()

    return args


def calc_bounding_rect(image, landmarks):
    # Calculate the bounding rectangle for the hand landmarks
    image_width, image_height = image.shape[1], image.shape[0]
    landmark_array = np.array([(lm.x * image_width, lm.y * image_height) for lm in landmarks.landmark], dtype=np.float32)
    
    if landmark_array.size == 0:
        return [0, 0, 0, 0]
    
    x, y, w, h = cv.boundingRect(landmark_array)
    return [x, y, x + w, y + h]

def calc_landmark_list(image, landmarks):
    # Calculate the list of landmarks
    image_width, image_height = image.shape[1], image.shape[0]
    landmark_list = [(int(lm.x * image_width), int(lm.y * image_height)) for lm in landmarks.landmark]
    return landmark_list

def pre_process_landmark(landmark_list):
    # Pre-process the landmark list for classification
    temp_landmark_list = copy.deepcopy(landmark_list)
    base_x, base_y = temp_landmark_list[0][0], temp_landmark_list[0][1]
    for index, landmark_point in enumerate(temp_landmark_list):
        temp_landmark_list[index] = (landmark_point[0] - base_x, landmark_point[1] - base_y)
    temp_landmark_list = list(itertools.chain(*temp_landmark_list))
    max_value = max(list(map(abs, temp_landmark_list)))
    def normalize_(n):
        return n / max_value
    temp_landmark_list = list(map(normalize_, temp_landmark_list))
    return temp_landmark_list

def pre_process_point_history(image, point_history):
    # Pre-process the point history for classification
    if not point_history:
        return []

    image_width, image_height = image.shape[1], image.shape[0]
    temp_point_history = copy.deepcopy(point_history)
    base_x, base_y = temp_point_history[0][0], temp_point_history[0][1]
    for index, point in enumerate(temp_point_history):
        temp_point_history[index] = ((point[0] - base_x) / image_width, (point[1] - base_y) / image_height)
    temp_point_history = list(itertools.chain(*temp_point_history))
    return temp_point_history

def logging_csv(number, mode, landmark_list, point_history_list):
    # Log the data to a CSV file
    csv_path = 'model/keypoint_classifier/keypoint_classifier_label.csv'
    with open(csv_path, 'a', newline="") as f:
        writer = csv.writer(f)
        writer.writerow([number, mode, *landmark_list, *point_history_list])

def read_labels(classifier_type):
    if classifier_type == "keypoint":
        with open('model/keypoint_classifier/keypoint_classifier_label.csv', encoding='utf-8-sig') as f:
            keypoint_classifier_labels = csv.reader(f)
            keypoint_classifier_labels = [row[0] for row in keypoint_classifier_labels]
        return keypoint_classifier_labels
    elif classifier_type == "point_history":
        with open('model/point_history_classifier/point_history_classifier_label.csv', encoding='utf-8-sig') as f:
            point_history_classifier_labels = csv.reader(f)
            point_history_classifier_labels = [row[0] for row in point_history_classifier_labels]
        return point_history_classifier_labels
    else:
        raise ValueError("Invalid classifier type")

def run_model(image_data):
    point_history = deque(maxlen=history_length)  # Define point_history with a maximum length
    finger_gesture_history = deque(maxlen=history_length)


    args = get_args()
    min_detection_confidence = args.min_detection_confidence
    min_tracking_confidence = args.min_tracking_confidence

    # Model load #############################################################
    mp_hands = mp.solutions.hands
    hands = mp_hands.Hands(
        max_num_hands=1,
        min_detection_confidence=min_detection_confidence,
        min_tracking_confidence=min_tracking_confidence,
    )

    keypoint_classifier = KeyPointClassifier(model_path='model/keypoint_classifier/keypoint_classifier.tflite')
    point_history_classifier = PointHistoryClassifier()

    # Assuming image_data is the input image
    image = image_data

    if image is None:
        print("Error: Image not loaded correctly.")
        return

    # Convert the BGR image to RGB
    image_rgb = cv.cvtColor(image, cv.COLOR_BGR2RGB)
    results = hands.process(image_rgb)

    if results.multi_hand_landmarks is not None:

        classification_list = []

        for hand_landmarks, handedness in zip(results.multi_hand_landmarks, results.multi_handedness):
            # Bounding box calculation
            brect = calc_bounding_rect(image, hand_landmarks)
            # Landmark calculation
            landmark_list = calc_landmark_list(image, hand_landmarks)

            # Conversion to relative coordinates / normalized coordinates
            pre_processed_landmark_list = pre_process_landmark(landmark_list)
            pre_processed_point_history_list = pre_process_point_history(image, point_history)

            # Hand sign classification
            hand_sign_id = keypoint_classifier(pre_processed_landmark_list)
            if hand_sign_id == 2:  # Point gesture
                point_history.append(landmark_list[8])
            else:
                point_history.append([0, 0])

            # Finger gesture classification
            finger_gesture_id = 0
            point_history_len = len(pre_processed_point_history_list)
            if point_history_len == (history_length * 2):
                finger_gesture_id = point_history_classifier(pre_processed_point_history_list)

            # Calculates the gesture IDs in the latest detection
            finger_gesture_history.append(finger_gesture_id)
            
            classification_list.append({
                'hand_sign_id' : hand_sign_id,
                'finger_gesture_id': list(finger_gesture_history)
            })

        
        return brect,landmark_list, classification_list[0]['hand_sign_id']


# Example usage
if __name__ == "__main__":
    # Load or capture your image data here
    image_data = cv.imread("ok.jpg")  # Replace with your image path
    run_model(image_data)