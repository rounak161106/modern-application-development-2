from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return {'message' : 'Hello World'}

@app.errorhandler(404)
def not_found(e):
    return jsonify(error="Page not found"), 404

@app.route('/submit', methods=['POST'])
def get_data():
    data = request.json
    print(data)
    print(type(data))
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug = True)