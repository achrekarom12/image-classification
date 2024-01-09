import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setImageUrl(URL.createObjectURL(file));
  };

  const handlePredictClick = async () => {
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://127.0.0.1:8080/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extract class and prediction from the API response
      const { class: predictedClass, prediction: confidence } = response.data;

      // Set the prediction state
      setPrediction({ predictedClass, confidence });
    } catch (error) {
      console.error('Error predicting:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold underline mb-4">Image Classification using CNN</h1>
      <h1 className="text-xl mb-2">Here I have used simple convolutional neural network architecture to predict between images of cats and dogs.</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
      {selectedFile && (
        <img src={imageUrl} alt="Selected" className="max-w-full mb-4 rounded-lg shadow-lg h-40 w-40" />
      )}
      <button
        onClick={handlePredictClick}
        className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none"
      >
        Predict
      </button>
      {prediction && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{`Class: ${prediction.predictedClass} | Confidence: ${(
            prediction.confidence * 100
          ).toFixed(2)}%`}</h2>
        </div>
      )}
    </div>
  );
}

export default App;
