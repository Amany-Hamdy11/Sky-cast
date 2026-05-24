from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import requests
import pickle
import json
import pandas as pd
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500"])

API_KEY = "97d1954495c49c7442a4262d94fb6c77"

# Load rain model and columns
# rain_model = pickle.load(open("gradient_boosting_pipeline_model.pkl", "rb"))
# rain_cols = json.load(open("gradient_boosting_pipeline_columns.json", "r"))
rain_model = pickle.load(open("gb_model.pkl", "rb"))
rain_cols = json.load(open("columns.json", "r"))
# Load temperature model and columns
temp_model = pickle.load(open("temperature_gradient_boosting_model.pkl", "rb"))
temp_cols = json.load(open("temperature_columns.json", "r"))


@app.route("/")
def home():
    return send_from_directory(".", "index.html")


def get_weather(city):
    url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"

    response = requests.get(url)
    data = response.json()

    if response.status_code != 200 or "main" not in data:
        return None

    temp = float(data["main"]["temp"])
    humidity = float(data["main"]["humidity"])
    pressure = float(data["main"]["pressure"])
    wind = float(data.get("wind", {}).get("speed", 0))

    return {
        "MinTemp": temp,
        "MaxTemp": temp,
        "Temp9am": temp,
        "Temp3pm": temp,
        "Humidity9am": humidity,
        "Humidity3pm": humidity,
        "Pressure9am": pressure,
        "Pressure3pm": pressure,
        "WindSpeed9am": wind,
        "WindSpeed3pm": wind,
        "WindGustSpeed": wind,
        "Rainfall": 0.0
    }


def make_input(weather, cols):
    df = pd.DataFrame(0.0, index=[0], columns=cols)

    for col, val in weather.items():
        if col in df.columns:
            df.loc[0, col] = float(val)

    return df.astype(float)


def get_prediction_date(day):
    today = datetime.now()

    if day == "tomorrow":
        date = today + timedelta(days=1)
    elif day == "after_tomorrow":
        date = today + timedelta(days=2)
    else:
        date = today

    return date.strftime("%Y-%m-%d")


@app.route("/predict", methods=["GET", "POST"])
def predict():
    if request.method == "POST":
        data = request.get_json()
        city = data.get("city")
        day = data.get("day", "today")
    else:
        city = request.args.get("city")
        day = request.args.get("day", "today")

    if not city:
        return jsonify({"error": "Enter city name"}), 400

    weather = get_weather(city)
    print("Weather Data:", weather)

    if weather is None:
        return jsonify({"error": "City not found or API error"}), 404

    rain_input = make_input(weather, rain_cols)
    rain = rain_model.predict(rain_input)[0]

    weather_for_temp = weather.copy()
    weather_for_temp["RainToday"] = float(rain)

    temp_input = make_input(weather_for_temp, temp_cols)
    temp = temp_model.predict(temp_input)[0]

    print("Predictions -> Rain:", rain, "Temp:", temp)

    prediction_date = get_prediction_date(day)

    return jsonify({
        "city": city.title(),
        "day": day,
        "date": prediction_date,
        "rain_prediction": int(rain),
        "rain_result": "Rain" if int(rain) == 1 else "No Rain",
        "temperature_prediction": round(float(temp), 2)
    })


if __name__ == "__main__":
    app.run(debug=True,port=5000)