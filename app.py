from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

def get_value(bandit):
    dummy = {'A': 10, 'B': 50, 'C': 90}
    return dummy.get(bandit, 0)
    #if bandit in ["ABC"]:

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/pull_bandit', methods=['POST'])
def pull_bandit():
    data = request.get_json()
    bandit = data.get('bandit')
    # value = random.randint(1, 100) if bandit else 0
    value = get_value(bandit)
    return jsonify({'value': value})

if __name__ == '__main__':
    app.run(debug=True)

