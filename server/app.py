from flask import Flask, request, jsonify
from flask_cors import CORS
from keras.models import load_model
from keras.preprocessing import image
from keras.applications.mobilenet_v2 import preprocess_input
import numpy as np
import os
import io

# Load the saved model
model = load_model("./model.h5")

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image file from the request
        file = request.files['image']

        # Read the contents of the file into an io.BytesIO object
        file_content = file.read()
        img = image.load_img(io.BytesIO(file_content), target_size=(150, 150))
        
        # Continue with the rest of your preprocessing
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)

        # Make a prediction using the loaded model
        prediction = model.predict(img_array)
        if(float(prediction[0][0] > float(prediction[0][1]))):
            result = {'prediction': float(prediction[0][0]),
                      'class': 'cat'}
        else:
            result = {'prediction': float(prediction[0][1]),
                      'class': 'dog'}
        return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 8080)))
