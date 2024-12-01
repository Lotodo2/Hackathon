import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import joblib
import os

# Example data (replace with your actual dataset)
data = pd.read_csv('energy_data.csv')

# Feature columns and target
X = data[['feature1', 'feature2', 'feature3']]
y = data['is_theft']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train a RandomForestClassifier
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Evaluate the model
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))

# Save the model in the same directory as project.py
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'energy_theft_model.pkl')
joblib.dump(model, MODEL_PATH)
