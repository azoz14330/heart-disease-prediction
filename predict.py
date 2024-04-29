import pickle
import numpy
from flask_cors import CORS
from flask import Flask, request, jsonify
import os
from dotenv import load_dotenv

load_dotenv()
modelRoute = os.getenv('MODEL_ROUTE')
host = os.getenv('HOST')
port = os.getenv('PORT')

reg = pickle.load(open(modelRoute, 'rb'))

app = Flask(__name__)
CORS(app)

@app.route('/receive_data', methods=['POST'])
def receive_data():
    data = request.get_json()
    print("Received JSON data:", data)
    key_list = data.get('key', [])
    print("Received list:", key_list)
    new_data = numpy.array([key_list])
    predictions = reg.predict(new_data)
    return jsonify({'Prediction': f"${predictions}"}), 200

if __name__ == '__main__':
    app.run(host, port)