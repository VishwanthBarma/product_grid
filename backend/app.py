from flask import Flask, jsonify
from flask_cors import CORS
from algo.FinalRecommendation import FinalRecommendation
from algo.TopRecommendation import top_n_products
from algo.SimilarRecommendation import similarRecommendations
import pandas as pd

app = Flask(__name__)
CORS(app)


products_csv_path = 'gridDB/productsDB.csv'
cart_csv_path = 'gridDB/cartDB.csv'
user_db_path = 'gridDB/usersDB.csv'


@app.route('/api/get-cart/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    try:
        cart_df = pd.read_csv(cart_csv_path)  # Load the cart CSV file
        user_cart = cart_df[cart_df['userId'] == user_id]  # Filter cart items for the user

        product_ids = user_cart['productIds'].tolist()

        products_df = pd.read_csv(products_csv_path)  # Load the products CSV file
        cart_products = products_df[products_df['product_id'].isin(product_ids)].to_dict('records')

        return jsonify(cart_products)
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/all-user-details', methods=['GET'])
def get_all_user_details():
    try:
        user_data = pd.read_csv(user_db_path)
        user_list = user_data.to_dict(orient='records')
        return user_list
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/product-details/<int:product_id>', methods=['GET'])
def get_product_details(product_id):
    products_df = pd.read_csv(products_csv_path)
    product_info = products_df[products_df['product_id'] == product_id].iloc[0]
    discount_percent = f"{product_info['discount']}% off"
    reviews_count_str = str(product_info['reviews_count'])

    product_details = {
        'id': product_id,
        'name': product_info['product_name'],
        'brand': product_info['brand'],
        'stock': product_info['stock'],
        'f_assured': bool(product_info['f_assured']),
        'price': product_info['price'],
        'original_price': product_info['original_price'],
        'discount': discount_percent,
        'image': product_info['images'],
        'seller': product_info['seller'],
        'seller_rating': product_info['seller_rating'],
        'return_policy': product_info['return_policy'],
        'description': product_info['description'],
        'specifications': product_info['specifications'],
        'avg_rating': product_info['avg_rating'],
        'reviews_count': round(product_info['avg_rating'], 2),
        'category': product_info['category'],
        'sub_category': product_info['sub_category']
    }

    return jsonify(product_details)

@app.route('/api/recommended-products/<int:user_id>', methods=['GET'])
def get_personalised_products(user_id):
    recommended_product_ids = FinalRecommendation(user_id, num_recommendations=500)
    products_df = pd.read_csv(products_csv_path)
    recommended_products = []


    for product_id in recommended_product_ids:
        matching_rows = products_df[products_df['product_id'] == product_id]

        if not matching_rows.empty:
            product_info = matching_rows.iloc[0].to_dict()

            recommended_product = {
                'id': product_id,
                'name': product_info['product_name'],
                'brand': product_info['brand'],
                'stock': product_info['stock'],
                'f_assured': bool(product_info['f_assured']),
                'price': product_info['price'],
                'original_price': product_info['original_price'],
                'discount': product_info['discount'],
                'image': product_info['images'],
                'seller': product_info['seller'],
                'seller_rating': product_info['seller_rating'],
                'return_policy': product_info['return_policy'],
                'description': product_info['description'],
                'specifications': product_info['specifications'],
                'avg_rating': product_info['avg_rating'],
                'reviews_count': product_info['reviews_count'],
                'category': product_info['category'],
                'sub_category': product_info['sub_category']
            }
            recommended_products.append(recommended_product)

    return jsonify(recommended_products)


@app.route('/api/top-products/<int:user_id>', methods=['GET'])
def get_top_products(user_id):
    recommended_product_ids = top_n_products(num_recommendations=500)
    products_df = pd.read_csv(products_csv_path)
    recommended_products = []


    for product_id in recommended_product_ids:
        matching_rows = products_df[products_df['product_id'] == product_id]

        if not matching_rows.empty:
            product_info = matching_rows.iloc[0].to_dict()

            recommended_product = {
                'id': product_id,
                'name': product_info['product_name'],
                'brand': product_info['brand'],
                'stock': product_info['stock'],
                'f_assured': bool(product_info['f_assured']),
                'price': product_info['price'],
                'original_price': product_info['original_price'],
                'discount': product_info['discount'],
                'image': product_info['images'],
                'seller': product_info['seller'],
                'seller_rating': product_info['seller_rating'],
                'return_policy': product_info['return_policy'],
                'description': product_info['description'],
                'specifications': product_info['specifications'],
                'avg_rating': product_info['avg_rating'],
                'reviews_count': product_info['reviews_count'],
                'category': product_info['category'],
                'sub_category': product_info['sub_category']
            }
            recommended_products.append(recommended_product)
    # return jsonify(recommended_products), 200, {'Content-Type': 'application/json'}
    return jsonify(recommended_products)



@app.route('/api/similar-products/<int:user_id>', methods=['GET'])
def get_similar_products(user_id):
    recommended_product_ids = similarRecommendations(user_id, num_recommendations=500)
    products_df = pd.read_csv(products_csv_path)
    recommended_products = []

    for product_id in recommended_product_ids:
        matching_rows = products_df[products_df['product_id'] == product_id]

        if not matching_rows.empty:
            product_info = matching_rows.iloc[0].to_dict()

            recommended_product = {
                'id': product_id,
                'name': product_info['product_name'],
                'brand': product_info['brand'],
                'stock': product_info['stock'],
                'f_assured': bool(product_info['f_assured']),
                'price': product_info['price'],
                'original_price': product_info['original_price'],
                'discount': product_info['discount'],
                'image': product_info['images'],
                'seller': product_info['seller'],
                'seller_rating': product_info['seller_rating'],
                'return_policy': product_info['return_policy'],
                'description': product_info['description'],
                'specifications': product_info['specifications'],
                'avg_rating': product_info['avg_rating'],
                'reviews_count': product_info['reviews_count'],
                'category': product_info['category'],
                'sub_category': product_info['sub_category']
            }
            recommended_products.append(recommended_product)
    # return jsonify(recommended_products), 200, {'Content-Type': 'application/json'}
    return jsonify(recommended_products)
if __name__ == '__main__':
    app.run(debug=True)