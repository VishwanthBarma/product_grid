from flask import Flask, jsonify, request
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
wishlist_csv_path = 'gridDB/wishlistDB.csv'


@app.route('/api/update-search-count', methods=['POST'])
def update_search_count():
    try:
        relation_csv_path = 'gridDB/userProductRelation.csv'
        relation_df = pd.read_csv(relation_csv_path)
        data = request.get_json()
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        
        if user_id is None or product_id is None:
            return jsonify({'error': 'Missing user_id or product_id in the request'}), 400

        updated_rows = []

        matching_rows = relation_df[(relation_df['user_id'] == user_id) & (relation_df['product_id'] == product_id)]
        if not matching_rows.empty:
            relation_df.loc[matching_rows.index, 'search_count'] += 1
            updated_rows.extend(matching_rows.index.tolist())
        else:
            new_row = {
                'user_id': user_id,
                'product_id': product_id,
                'liked_or_not': 0,
                'wishlisted_or_not': 0,
                'ordered_or_not': 0,
                'search_count': 1
            }
            relation_df = relation_df.append(new_row, ignore_index=True)
            updated_rows.append(len(relation_df) - 1)

        relation_df.to_csv(relation_csv_path, index=False)
        return jsonify({'message': 'Search count status updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/update-wishlist-status-negative', methods=['POST'])
def update_wishlist_status_negative():
    try:
        relation_csv_path = 'gridDB/userProductRelation.csv'
        relation_df = pd.read_csv(relation_csv_path)
        data = request.get_json()
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        if user_id is None or product_id is None:
            return jsonify({'error': 'Missing user_id or product_id in the request'}), 400

        updated_rows = []

        matching_rows = relation_df[(relation_df['user_id'] == user_id) & (relation_df['product_id'] == product_id)]
        if not matching_rows.empty:
            relation_df.loc[matching_rows.index, 'wishlisted_or_not'] = 0
            updated_rows.extend(matching_rows.index.tolist())
        else:
            new_row = {
                'user_id': user_id,
                'product_id': product_id,
                'liked_or_not': 0,
                'wishlisted_or_not': 0,
                'ordered_or_not': 0,
                'search_count': 0
            }
            relation_df = relation_df.append(new_row, ignore_index=True)
            updated_rows.append(len(relation_df) - 1)

        relation_df.to_csv(relation_csv_path, index=False)
        return jsonify({'message': 'Wishlist status updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/update-wishlist-status', methods=['POST'])
def update_wishlist_status():
    try:
        relation_csv_path = 'gridDB/userProductRelation.csv'
        relation_df = pd.read_csv(relation_csv_path)
        data = request.get_json()
        user_id = data.get('user_id')
        product_id = data.get('product_id')
        if user_id is None or product_id is None:
            return jsonify({'error': 'Missing user_id or product_id in the request'}), 400

        updated_rows = []

        matching_rows = relation_df[(relation_df['user_id'] == user_id) & (relation_df['product_id'] == product_id)]
        if not matching_rows.empty:
            relation_df.loc[matching_rows.index, 'wishlisted_or_not'] = 1
            updated_rows.extend(matching_rows.index.tolist())
        else:
            new_row = {
                'user_id': user_id,
                'product_id': product_id,
                'liked_or_not': 0,
                'wishlisted_or_not': 1,
                'ordered_or_not': 0,
                'search_count': 0
            }
            relation_df = relation_df.append(new_row, ignore_index=True)
            updated_rows.append(len(relation_df) - 1)

        relation_df.to_csv(relation_csv_path, index=False)
        return jsonify({'message': 'Wishlist status updated successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/update-order-status', methods=['POST'])
def update_order_status():
    try:
        relation_csv_path = 'gridDB/userProductRelation.csv'
        relation_df = pd.read_csv(relation_csv_path)
        cart_csv_path = 'gridDB/cartDB.csv'
        cart_df = pd.read_csv(cart_csv_path)
        data = request.get_json()
        user_id = data.get('user_id')
        product_ids = data.get('product_ids')
        if user_id is None or product_ids is None:
            return jsonify({'error': 'Missing user_id or product_ids in the request'}), 400
        updated_rows = []
        for product_id in product_ids:
            matching_rows = relation_df[(relation_df['user_id'] == user_id) & (relation_df['product_id'] == product_id)]
            if not matching_rows.empty:
                relation_df.loc[matching_rows.index, 'ordered_or_not'] = 1
                updated_rows.extend(matching_rows.index.tolist())
            else:
                new_row = {
                    'user_id': user_id,
                    'product_id': product_id,
                    'liked_or_not': 0,
                    'wishlisted_or_not': 0,
                    'ordered_or_not': 1,
                    'search_count': 0
                }
                relation_df = relation_df.append(new_row, ignore_index=True)
                updated_rows.append(len(relation_df) - 1)

        relation_df.to_csv(relation_csv_path, index=False)
        cart_df = cart_df[~((cart_df['userId'] == user_id) & (cart_df['productIds'].isin(product_ids)))]
        cart_df.to_csv(cart_csv_path, index=False)
        return jsonify({'message': 'Order status updated successfully and cart items deleted'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/api/get-wishlist/<int:user_id>', methods=['GET'])
def get_wishlist(user_id):
    try:
        wishlist_df = pd.read_csv(wishlist_csv_path)
        user_wishlist = wishlist_df[wishlist_df['userId'] == user_id]

        product_ids = user_wishlist['productIds'].tolist()

        products_df = pd.read_csv(products_csv_path)
        wishlist_products = products_df[products_df['product_id'].isin(product_ids)].to_dict('records')

        return jsonify(wishlist_products)
    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/api/get-cart/<int:user_id>', methods=['GET'])
def get_cart(user_id):
    try:
        cart_df = pd.read_csv(cart_csv_path)
        user_cart = cart_df[cart_df['userId'] == user_id]

        product_ids = user_cart['productIds'].tolist()

        products_df = pd.read_csv(products_csv_path)
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

@app.route('/api/all-product-details', methods=['GET'])
def get_all_product_details():
    try:
        product_data = pd.read_csv(products_csv_path)
        product_list = product_data.to_dict(orient='records')
        return product_list
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Particular Product
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
    return jsonify(recommended_products)

if __name__ == '__main__':
    app.run(debug=True)