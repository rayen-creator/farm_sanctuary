from flask import Flask, request, escape
from flask_restful import Resource, Api
import numpy as np
import json
import pickle
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)

CORS(app)
model = pickle.load(open('model.pkl', 'rb'))


@app.route('/')
def hello():
    name = request.args.get("name", "world")
    return 'Hello'
@app.route('/predict', methods =['POST'])
def predict():
    data = request.get_json(force=True)
    features = [np.array(data['data'])]
    prediction = model.predict(features)
    return str(prediction[0])
# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    app.run(debug=True)
