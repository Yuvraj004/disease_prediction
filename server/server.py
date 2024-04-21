from flask import Flask,request,jsonify
import util
app = Flask(__name__) #module

@app.route('/')
def hello():
    return "Hi"

@app.route('/get_data_columns', methods=['GET'])
def get_data_columns():
    response = jsonify({
        'Data_Columns': util.get_data_columns()
    })
    response.headers.add('Access-Control-Allow-Origin','*')
    return response

@app.route('/predict_disease', methods=['GET', 'POST','OPTIONS'])
def predict_disease():
    if request.method == 'OPTIONS':  # Handle preflight requests
        headers = {
            'Access-Control-Allow-Origin': 'no-cors',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
        return '', 200, headers
    age = float(request.form['age'])
    sex = request.form['sex']
    chest_pain_type = int(request.form['chest_pain_type'])
    resting_bp = int(request.form['resting_bp'])
    cholesterol = int(request.form['cholesterol'])
    blood_sugar = int(request.form['blood_sugar'])
    max_heart_rate = int(request.form['max_heart_rate'])

    response = jsonify({
        'disease_chances': util.predict_disease(sex,age,chest_pain_type,resting_bp,cholesterol,blood_sugar,max_heart_rate)
    })
    response.headers.add('Access-Control-Allow-Origin', 'no-cors')

    return response

if __name__ =="__main__":
    print("Python Flask Server")
    util.load_saved_artifacts()
    app.run()