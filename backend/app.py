from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/recommended-products', methods=['GET'])
def get_recommended_products():
    # Generate or retrieve recommended product data
    recommended_products = [
        {'id': 1, 'name': 'Product A'},
        {'id': 2, 'name': 'Product B'},
        # ...
    ]
    return jsonify(recommended_products)

if __name__ == '__main__':
    app.run(debug=True)
