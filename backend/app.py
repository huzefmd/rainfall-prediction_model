from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash

import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS

# Load the model
model_dict = pickle.load(open("rainfall_prediction_model.pkl", "rb"))
model = model_dict["model"]

# In-memory user store (replace with DB for production)
users = {}

@app.route("/signup", methods=["POST"])
def signup():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    if username in users:
        return jsonify({"error": "User already exists"}), 409

    # Store user with hashed password
    users[username] = generate_password_hash(password)
    print(f"✅ User registered: {username}")
    return jsonify({"message": "Signup successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if username not in users:
        return jsonify({"error": "User not found"}), 404

    if not check_password_hash(users[username], password):
        return jsonify({"error": "Invalid password"}), 401

    print(f"🔓 User logged in: {username}")
    return jsonify({"message": "Login successful"}), 200

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        print("Received JSON:", data)

        # All 7 features required
        required_keys = [
            "temperature", "humidity", "windSpeed", "pressure",
            "feature5", "feature6", "feature7"
        ]

        for key in required_keys:
            if key not in data:
                raise ValueError(f"Missing key: {key}")

        features = [float(data[key]) for key in required_keys]
        print("Parsed features:", features)

        prediction = model.predict([features])
        return jsonify({"prediction": int(prediction[0])})

    except Exception as e:
        print("❌ Error:", str(e))
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
