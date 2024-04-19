import json
import pickle
import numpy as np
import pandas as pd
data_columns=None
model = None
avg_values = None

def get_data_columns():
    return data_columns

def load_saved_artifacts():
    global data_columns
    global avg_values
    global model
    with open('./artifacts/columns.json') as j_file:
        data_columns = json.load(j_file)['data_columns']
    j_file.close()
    with open('./artifacts/heart_disease_model.pickle','rb') as f:
        model = pickle.load(f)
    f.close()
    with open('./artifacts/avg_values.json') as ang:
        avg_values = json.load(ang)
    ang.close()

    

def predict_disease(age, sex, chest_pain_type, resting_bp, cholesterol, blood_sugar, max_heart_rate):
    if blood_sugar > 120:
        blood_sugar = 1
    elif blood_sugar <= 120:
        blood_sugar = 0

    input_data = np.array([age, sex, chest_pain_type, resting_bp, cholesterol, blood_sugar, max_heart_rate])
    input_data = input_data.astype(int)

    # Create a list of missing columns
    missing_columns = [col for col in data_columns if col not in ['age', 'sex', 'chest_pain_type', 'resting_bp', 'cholesterol', 'blood_sugar', 'max_heart_rate']]

    mis_array = []
    # Assign avg_values to missing columns
    for col in missing_columns:
        # print(avg_values[col])
        mis_array.append(avg_values[col])
    
    input_data = np.concatenate([input_data, mis_array])
    
    input_df = pd.DataFrame([input_data], columns=data_columns)
    print(input_df)
    return model.predict(input_df)[0]


if __name__=="__main__":
    load_saved_artifacts()
    # print(get_data_columns())
    print('Heart Attack Possible: ',predict_disease(60,1,3,200,393,121,176))
    print('Heart Attack Possible: ',predict_disease(60,1,3,140,203,150,123))
    print('Heart Attack Possible: ',predict_disease(20,0,3,200,400,121,190))
    print('Heart Attack Possible: ',predict_disease(80,0,4,200,393,100,176))