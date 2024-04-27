from flask import Flask,request,jsonify
import numpy as np
import util
import os
app = Flask(__name__) #module

@app.route('/')
def hello():
    return "Hi"

@app.route('/get_data_columns', methods=['GET','OPTIONS'])
def get_data_columns():
    if request.method == 'OPTIONS':  # Handle preflight requests
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return '', 200, headers
    
    response = jsonify({
        'Data_Columns': util.get_data_columns()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/predict_disease', methods=['GET', 'POST','OPTIONS'])
def predict_disease():
    if request.method == 'OPTIONS':  # Handle preflight requests
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return '', 200, headers
    data = request.get_json()
    
    print(data)
    age = float(data['age'])
    sex = int(data['sex'])
    chest_pain_type = int(data['chestpaintype'])
    resting_bp = int(data['restingbp'])
    cholesterol = int(data['cholesterol'])
    blood_sugar = int(data['bloodsugar'])
    max_heart_rate = int(data['max_heart_rate'])

    chance = util.predict_disease(sex,age,chest_pain_type,resting_bp,cholesterol,blood_sugar,max_heart_rate)
    print(chance," ",type(chance))

    if isinstance(chance, np.ndarray):
        chance = chance.tolist()
    elif isinstance(chance, (np.int64, np.float64)):
        chance = chance.item()

    response = jsonify({
        'disease_chances': chance
    })
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ =="__main__":
    print("Python Flask Server")
    util.load_saved_artifacts()
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True)