from flask import Flask, request, escape, jsonify
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
@app.route('/predict', methods =['POST'])
def predict(response):
    data = request.get_json(force=True)
    features = [np.array(data['data'])]
    prediction = model.predict(features)
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return jsonify({'message': 'Todo deleted successfully'}), 200
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)
