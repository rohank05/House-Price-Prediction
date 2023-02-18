from flask import Flask, request, jsonify
from flask_cors import CORS
import util

app = Flask(__name__)
CORS(app)


@app.route("/get_locations")
def get_location():
    response = jsonify({
        "locations": util.get_locations()
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


@app.route("/get_price")
def get_price():
    sqft = float(request.json["sqft"])
    location = request.json["location"]
    bhk = int(request.json["bhk"])
    bath = int(request.json["bath"])
    response = jsonify({
        "estimated_price": util.get_estimated_price(location, sqft, bhk, bath)
    })
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    print("Server Started on PORT 5000")
    util.load_saved_artifacts()
    app.run()
