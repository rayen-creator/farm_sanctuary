from flask import Flask, request, jsonify
from chat import get_response
import numpy as np
import pickle
from flask_cors import CORS, cross_origin
from datetime import datetime
from service.facial_recognition import recognize_face_service, uploadService

app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})

model = pickle.load(open('model/model.pkl', 'rb'))

@app.route('/',methods=["GET"])
def hello():
    name = request.args.get("name", "world")
    return 'Hello'

@app.route("/chat",methods=["POST"])
def chatbot():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer":response}
    return jsonify(message)

@app.route('/upload', methods=['POST'])
def upload():
    return uploadService()

@app.route('/recognize_face', methods=['POST'])
def recognize_face():
    return recognize_face_service()

@app.route('/predict', methods =['POST'])
def predict():
    data = request.get_json(force=True)
    features = [np.array(data['data'])]
    prediction = model.predict(features)
    return jsonify(prediction[0])


# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run()
