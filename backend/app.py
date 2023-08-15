from flask import Flask, jsonify
from flask_cors import CORS
from algo.FinalRecommendation import FinalRecommendation
from algo.TopRecommendation import top_n_products
from algo.SimilarRecommendation import similarRecommendations
import pandas as pd

app = Flask(__name__)
CORS(app)


products_csv_path = 'gridDB/productsDB.csv'


@app.route('/api/product-details/<int:product_id>', methods=['GET'])
def get_product_details(product_id):
    products_df = pd.read_csv(products_csv_path)
    product_info = products_df[products_df['product_id'] == product_id].iloc[0]

    images_list = product_info['images'].split('|')
    image_urls = [url.strip() for url in images_list if url.strip()]

    product_details = {
        'id': product_id,
        'name': product_info['product_name'],
        'url': product_info['url'],
        'brand': product_info['brand'],
        'stock': product_info['stock'],
        'f_assured': bool(product_info['f_assured']),
        'price': product_info['price'],
        'original_price': product_info['original_price'],
        'discount': product_info['discount'],
        'images': image_urls,
        'seller': product_info['seller'],
        'seller_rating': product_info['seller_rating'],
        'return_policy': product_info['return_policy'],
        'description': product_info['description'],
        'specifications': product_info['specifications'],
        'formatted_specifications': product_info['formatted_specifications'],
        'avg_rating': round(product_info['avg_rating'], 2),
        'reviews_count': product_info['reviews_count'],
        'category': product_info['category'],
        'sub_category': product_info['sub_category']
    }

    return product_details

@app.route('/api/recommended-products/<int:user_id>', methods=['GET'])
def get_personalised_products(user_id):
    recommended_product_ids = FinalRecommendation(user_id, num_recommendations=100)
    products_df = pd.read_csv(products_csv_path)
    recommended_products = []


    for product_id in recommended_product_ids:
        matching_rows = products_df[products_df['product_id'] == product_id]

        if not matching_rows.empty:
            product_info = matching_rows.iloc[0]

            images_list = product_info['images'].split('|')
            image_urls = [url.strip() for url in images_list if url.strip()]

            recommended_product = {
                'id': product_id,
                'name': product_info['product_name'],
                #'url': product_info['url'],
                'brand': product_info['brand'],
                'stock': product_info['stock'],
                'f_assured': bool(product_info['f_assured']),
                'price': product_info['price'],
                'original_price': product_info['original_price'],
                'discount': product_info['discount'],
                'images': image_urls,
                'seller': product_info['seller'],
                'seller_rating': product_info['seller_rating'],
                'return_policy': product_info['return_policy'],
                'description': product_info['description'],
                'specifications': product_info['specifications'],
                'formatted_specifications': product_info['formatted_specifications'],
                'avg_rating': product_info['avg_rating'],
                'reviews_count': product_info['reviews_count'],
                'category': product_info['category'],
                'sub_category': product_info['sub_category']
            }
            recommended_products.append(recommended_product)

    return recommended_products


@app.route('/api/top-products/<int:user_id>', methods=['GET'])
def get_top_products(user_id):
    recommended_product_ids = top_n_products(num_recommendations=100)
    products_df = pd.read_csv(products_csv_path)
    recommended_products = []


    for product_id in recommended_product_ids:
        matching_rows = products_df[products_df['product_id'] == product_id]

        if not matching_rows.empty:
            product_info = matching_rows.iloc[0]

            images_list = product_info['images'].split('|')
            image_urls = [url.strip() for url in images_list if url.strip()]

            recommended_product = {
                'id': product_id,
                'name': product_info['product_name'],
                #'url': product_info['url'],
                'brand': product_info['brand'],
                'stock': product_info['stock'],
                'f_assured': bool(product_info['f_assured']),
                'price': product_info['price'],
                'original_price': product_info['original_price'],
                'discount': product_info['discount'],
                'images': image_urls,
                'seller': product_info['seller'],
                'seller_rating': product_info['seller_rating'],
                'return_policy': product_info['return_policy'],
                'description': product_info['description'],
                'specifications': product_info['specifications'],
                'formatted_specifications': product_info['formatted_specifications'],
                'avg_rating': product_info['avg_rating'],
                'reviews_count': product_info['reviews_count'],
                'category': product_info['category'],
                'sub_category': product_info['sub_category']
            }
            recommended_products.append(recommended_product)
    # return jsonify(recommended_products), 200, {'Content-Type': 'application/json'}
    return recommended_products



@app.route('/api/similar-products/<int:user_id>', methods=['GET'])
def get_similar_products(user_id):
    recommended_product_ids = similarRecommendations(user_id, num_recommendations=100)
    products_df = pd.read_csv(products_csv_path)
    recommended_products = []

    for product_id in recommended_product_ids:
        matching_rows = products_df[products_df['product_id'] == product_id]

        if not matching_rows.empty:
            product_info = matching_rows.iloc[0]

            images_list = product_info['images'].split('|')
            image_urls = [url.strip() for url in images_list if url.strip()]

            recommended_product = {
                'id': product_id,
                'name': product_info['product_name'],
                'url': product_info['url'],
                'brand': product_info['brand'],
                'stock': product_info['stock'],
                'f_assured': bool(product_info['f_assured']),
                'price': product_info['price'],
                'original_price': product_info['original_price'],
                'discount': product_info['discount'],
                'images': image_urls,
                'seller': product_info['seller'],
                'seller_rating': product_info['seller_rating'],
                'return_policy': product_info['return_policy'],
                'description': product_info['description'],
                'specifications': product_info['specifications'],
                'formatted_specifications': product_info['formatted_specifications'],
                'avg_rating': product_info['avg_rating'],
                'reviews_count': product_info['reviews_count'],
                'category': product_info['category'],
                'sub_category': product_info['sub_category']
            }
            recommended_products.append(recommended_product)
    # return jsonify(recommended_products), 200, {'Content-Type': 'application/json'}
    return recommended_products



if __name__ == '__main__':
    app.run(debug=True)