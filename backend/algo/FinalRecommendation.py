import pandas as pd
import numpy as np
import os
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.decomposition import TruncatedSVD


user_product_csv_path = os.path.join(os.getcwd(), 'gridDB', 'userProductRelation.csv')
products_csv_path = os.path.join(os.getcwd(), 'gridDB', 'productsDB.csv')

def FinalRecommendation(user_id, num_recommendations, num_components=50):
    user_product_df = pd.read_csv(user_product_csv_path)
    products_df = pd.read_csv(products_csv_path) 
    merged_df = user_product_df.merge(products_df, on='product_id', how='left')
    interaction_matrix = pd.pivot_table(merged_df, values=['liked_or_not', 'wishlisted_or_not', 'ordered_or_not', 'search_count'],
                                    index='user_id', columns='product_id', fill_value=0)
    if user_id not in interaction_matrix.index:
        print(f"User with ID {user_id} has no interactions recorded.")
        return []  # Return an empty list of recommendations
    svd = TruncatedSVD(n_components=num_components, random_state=42)
    interaction_matrix_svd = svd.fit_transform(interaction_matrix)
    item_similarity_svd = cosine_similarity(interaction_matrix_svd.T)
    user_interactions = interaction_matrix.loc[user_id]
    product_scores = {}
    for product_id in interaction_matrix.columns.get_level_values('product_id'):
        ordered_products = user_interactions[('ordered_or_not', product_id)]
        same_category_products = merged_df[(merged_df['category'] == merged_df.loc[merged_df['product_id'] == product_id, 'category'].values[0]) &
                                           (merged_df['sub_category'] == merged_df.loc[merged_df['product_id'] == product_id, 'sub_category'].values[0])]
        if ordered_products == 0 or same_category_products['ordered_or_not'].sum() == 0:
            score = (user_interactions[('liked_or_not', product_id)] * 3 +
                     user_interactions[('wishlisted_or_not', product_id)] * 2 +
                     user_interactions[('search_count', product_id)])
            product_scores[product_id] = score
    sorted_recommendations = sorted(product_scores.keys(), key=lambda x: product_scores[x], reverse=True)
    return sorted_recommendations[:num_recommendations]