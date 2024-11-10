from flask import Flask, jsonify, request
from flask_cors import CORS
import logging
import base64
import cv2 as cv
import numpy as np
from Model import run_model

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create a file handler
file_handler = logging.FileHandler('app.log')
file_handler.setLevel(logging.INFO)

# Create a logging format
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
file_handler.setFormatter(formatter)

# Add the file handler to the logger
logger.addHandler(file_handler)

@app.route('/')
def home():
    return jsonify({'message': 'Welcome to SignLanguageAI'})

@app.route('/readImage', methods=['POST'])
def readImage():
    data = request.json
    if 'image_data' not in data:
        return jsonify({'error': 'No image_data key found in JSON payload'}), 400

    try:
        image = load_image_from_json(data)
    except ValueError as e:
        return jsonify({'error': str(e)}), 400

    if image is None:
        return jsonify({'error': 'Image not loaded correctly'}), 400

    imageFlip = cv.flip(image, 1)
    result = process_image_with_model(imageFlip)
    return jsonify(result), 200

def load_image_from_json(data):
    # Assuming the image data is stored as a base64 string in the JSON payload
    image_data_base64 = data['image_data']
    
    # Remove any data URL prefix if present
    if image_data_base64.startswith('data:image'):
        image_data_base64 = image_data_base64.split(',')[1]
    
    # Add padding to the base64 string if necessary
    missing_padding = len(image_data_base64) % 4
    if missing_padding:
        image_data_base64 += '=' * (4 - missing_padding)
    
    # Decode the base64 string to bytes
    try:
        image_data_bytes = base64.b64decode(image_data_base64)
    except binascii.Error as e:
        raise ValueError("Invalid base64-encoded string") from e
    
    # Convert the bytes to a NumPy array
    image_array = np.frombuffer(image_data_bytes, dtype=np.uint8)
    
    # Decode the image array to an OpenCV image
    image = cv.imdecode(image_array, cv.IMREAD_COLOR)
    
    return image

def process_image_with_model(image):
    result = run_model(image)
    
    if result is None:
        return {'error': 'Model did not return any result'}
    
    box, cords, classification = result

    print(int(classification))

    return {
        'box': box,
        'cords': cords,
        'classification': int(classification)
        }
if __name__ == "__main__":
    app.run(debug=True, port=5000)