import pandas as pd
import json
import pickle
from sklearn.model_selection import train_test_split
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error

# 🔹 1. Load dataset
df = pd.read_csv("C:\\Users\\Dell\\Downloads\\weather\\weather\\weather\\BackEnd\\clean_weather_data.csv") 

# 🔹 2. Clean data
df = df.dropna()

# 🔹 3. Select features (IMPORTANT)
features = [
    "MinTemp", "MaxTemp",
    "Humidity9am", "Humidity3pm",
    "Pressure9am", "Pressure3pm",
    "WindSpeed9am", "WindSpeed3pm",
    "WindGustSpeed", "Rainfall",
    "RainToday"
]

target = "Temp3pm"   # ← what we want to predict

# 🔹 4. Prepare data
X = df[features]
y = df[target]

# 🔹 5. Train/test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 🔹 6. Train model
model = GradientBoostingRegressor()
model.fit(X_train, y_train)

# 🔹 7. Evaluate (optional but good)
preds = model.predict(X_test)
mae = mean_absolute_error(y_test, preds)
print("MAE:", mae)

# 🔹 8. Save model
with open("temperature_gradient_boosting_model.pkl", "wb") as f:
    pickle.dump(model, f)

# 🔹 9. Save columns
with open("temperature_columns.json", "w") as f:
    json.dump(features, f)

print(" Temperature model saved successfully!")