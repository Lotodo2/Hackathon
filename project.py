from flask import Flask, request, jsonify
import joblib
import os

app = Flask(__name__)

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'energy_theft_model.pkl')
model = joblib.load(MODEL_PATH)

@app.route('/')
def home():
    return "Energy Theft Prediction API"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json  # Get JSON data
    features = [data['feature1'], data['feature2'], data['feature3']]
    prediction = model.predict([features])
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
