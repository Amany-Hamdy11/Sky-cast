import pandas as pd
import numpy as np
import pickle
import json

from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.neighbors import KNeighborsClassifier
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.model_selection import KFold, cross_val_score, cross_val_predict
from sklearn.metrics import confusion_matrix, classification_report


# =========================
# 1) Load Clean Dataset
# =========================
df = pd.read_csv("C:\\Users\\Dell\\Downloads\\weather\\weather\\weather\\BackEnd\\clean_weather_data.csv")

df = df.drop("row ID", axis=1, errors="ignore")
df = df.drop("Data", axis=1, errors="ignore")
df = df.drop("Date", axis=1, errors="ignore")

df = df.dropna()


# =========================
# 2) Rain Prediction Model
# =========================
X_rain = df.drop(["RainToday", "Rainfall"], axis=1, errors="ignore")
y_rain = df["RainToday"]

X_rain = pd.get_dummies(X_rain, drop_first=True)
X_rain = X_rain.fillna(X_rain.mean())

cv = KFold(n_splits=5, shuffle=True, random_state=42)


# Random Forest
rf_model = RandomForestClassifier(
    n_estimators=100,
    max_depth=5,
    random_state=42
)

rf_scores = cross_val_score(rf_model, X_rain, y_rain, cv=cv, scoring="accuracy")
rf_pred = cross_val_predict(rf_model, X_rain, y_rain, cv=cv)

print("Random Forest Classifier Results")
print("Accuracy Scores:", rf_scores)
print("Mean Accuracy:", rf_scores.mean())
print("Confusion Matrix:")
print(confusion_matrix(y_rain, rf_pred))
print("Classification Report:")
print(classification_report(y_rain, rf_pred))


# Gradient Boosting Classifier
gb_model = GradientBoostingClassifier(random_state=42)

gb_scores = cross_val_score(gb_model, X_rain, y_rain, cv=cv, scoring="accuracy")
gb_pred = cross_val_predict(gb_model, X_rain, y_rain, cv=cv)

print("\nGradient Boosting Classifier Results")
print("Accuracy Scores:", gb_scores)
print("Mean Accuracy:", gb_scores.mean())
print("Confusion Matrix:")
print(confusion_matrix(y_rain, gb_pred))
print("Classification Report:")
print(classification_report(y_rain, gb_pred))


# KNN
knn_model = Pipeline([
    ("scaler", StandardScaler()),
    ("knn", KNeighborsClassifier(n_neighbors=5))
])

knn_scores = cross_val_score(knn_model, X_rain, y_rain, cv=cv, scoring="accuracy")
knn_pred = cross_val_predict(knn_model, X_rain, y_rain, cv=cv)

print("\nKNN Classifier Results")
print("Accuracy Scores:", knn_scores)
print("Mean Accuracy:", knn_scores.mean())
print("Confusion Matrix:")
print(confusion_matrix(y_rain, knn_pred))
print("Classification Report:")
print(classification_report(y_rain, knn_pred))


# Train final rain model
gb_model.fit(X_rain, y_rain)

with open("gb_model.pkl", "wb") as f:
    pickle.dump(gb_model, f)

with open("columns.json", "w") as f:
    json.dump(list(X_rain.columns), f)

print("\nRain model saved successfully: gb_model.pkl")
print("Rain columns saved successfully: columns.json")


# =========================
# 3) Temperature Prediction Model
# =========================
y_temp = df["Temp3pm"]
X_temp = df.drop(columns=["Temp3pm"], errors="ignore")

X_temp = pd.get_dummies(X_temp, drop_first=True)
X_temp = X_temp.fillna(X_temp.mean())
y_temp = y_temp.fillna(y_temp.mean())


# Gradient Boosting Regressor
gbr_model = GradientBoostingRegressor(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=3,
    random_state=42
)

mse_scores = cross_val_score(
    gbr_model,
    X_temp,
    y_temp,
    cv=cv,
    scoring="neg_mean_squared_error"
)

mse_scores = -mse_scores
rmse_scores = np.sqrt(mse_scores)
r2_scores = cross_val_score(gbr_model, X_temp, y_temp, cv=cv, scoring="r2")

print("\nGradient Boosting Regressor Results")
print("Mean MSE:", mse_scores.mean())
print("Mean RMSE:", rmse_scores.mean())
print("Mean R2 Score:", r2_scores.mean())


# Linear Regression
lr_model = LinearRegression()

lr_mse_scores = cross_val_score(
    lr_model,
    X_temp,
    y_temp,
    cv=cv,
    scoring="neg_mean_squared_error"
)

lr_mse_scores = -lr_mse_scores
lr_rmse_scores = np.sqrt(lr_mse_scores)
lr_r2_scores = cross_val_score(lr_model, X_temp, y_temp, cv=cv, scoring="r2")

print("\nLinear Regression Results")
print("Mean MSE:", lr_mse_scores.mean())
print("Mean RMSE:", lr_rmse_scores.mean())
print("Mean R2 Score:", lr_r2_scores.mean())


# Decision Tree Regressor
dt_model = DecisionTreeRegressor(
    max_depth=5,
    random_state=42
)

dt_mse_scores = cross_val_score(
    dt_model,
    X_temp,
    y_temp,
    cv=cv,
    scoring="neg_mean_squared_error"
)

dt_mse_scores = -dt_mse_scores
dt_rmse_scores = np.sqrt(dt_mse_scores)
dt_r2_scores = cross_val_score(dt_model, X_temp, y_temp, cv=cv, scoring="r2")

print("\nDecision Tree Regressor Results")
print("Mean MSE:", dt_mse_scores.mean())
print("Mean RMSE:", dt_rmse_scores.mean())
print("Mean R2 Score:", dt_r2_scores.mean())


# Train final temperature model
gbr_model.fit(X_temp, y_temp)

with open("temperature_gradient_boosting_model.pkl", "wb") as f:
    pickle.dump(gbr_model, f)

with open("temperature_columns.json", "w") as f:
    json.dump(list(X_temp.columns), f)

print("\nTemperature model saved successfully: temperature_gradient_boosting_model.pkl")
print("Temperature columns saved successfully: temperature_columns.json")