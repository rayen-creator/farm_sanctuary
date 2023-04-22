from flask import Flask, request, escape, jsonify , render_template 
from chat import get_response
from flask_restful import Resource, Api
import numpy as np
import json
import pickle
import pandas as pd
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type'

# CORS(app, resources={r"/*": {"origins": "http://localhost:4200"}})
model = pickle.load(open('model.pkl', 'rb'))


@app.route('/')
def hello():
    name = request.args.get("name", "world")
    return 'Hello'


@cross_origin()
@app.route("/chat",methods=["POST"])
def chatbot():
    text = request.get_json().get("message")
    response = get_response(text)
    message = {"answer":response}
    return jsonify(message)





@cross_origin()
@app.route('/predict', methods =['POST'])
def predict():
    data = request.get_json(force=True)
    features = [np.array(data['data'])]
    prediction = model.predict(features)
    return jsonify(prediction[0])
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run()
