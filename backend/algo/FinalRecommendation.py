import pandas as pd
import numpy as np
import os
from sklearn.metrics.pairwise import cosine_similarity

user_product_csv_path = os.path.join(os.getcwd(), 'gridDB', 'userProductRelation.csv')
products_csv_path = os.path.join(os.getcwd(), 'gridDB', 'productsDB.csv')

def FinalRecommendation(user_id,num_recommendations):
    user_product_df = pd.read_csv(user_product_csv_path)
    products_df = pd.read_csv(products_csv_path) 
    merged_df = user_product_df.merge(products_df, on='product_id', how='left')
    interaction_matrix = pd.pivot_table(merged_df, values=['liked_or_not', 'wishlisted_or_not', 'ordered_or_not', 'search_count'],
                                    index='user_id', columns='product_id', fill_value=0)
    item_similarity = cosine_similarity(interaction_matrix.T)
    user_interactions = interaction_matrix.loc[user_id]  # Fix variable name here
    product_scores = {}
    for product_id in interaction_matrix.columns.get_level_values('product_id'):  # Fix variable name here
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
