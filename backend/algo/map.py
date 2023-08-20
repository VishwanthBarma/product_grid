import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

# Load data
product_data_path = '/content/drive/MyDrive/gridDB/productDB.csv'
user_product_relation_path = '/content/drive/MyDrive/gridDB/userProductRelation.csv'

product_df = pd.read_csv(product_data_path)
user_product_df = pd.read_csv(user_product_relation_path)

merged_df = user_product_df.merge(product_df, on='product_id', how='left')

interaction_matrix = pd.pivot_table(merged_df, values=['liked_or_not', 'wishlisted_or_not', 'ordered_or_not', 'search_count'],
                                    index='user_id', columns='product_id', fill_value=0)

item_similarity = cosine_similarity(interaction_matrix.T)

def calculate_precision_at_k(recommended_items, relevant_items, k):
    relevant_recommended_items = recommended_items[:k]
    num_relevant_recommended = sum(1 for item in relevant_recommended_items if item in relevant_items)
    return num_relevant_recommended / k

def calculate_average_precision(recommended_items, relevant_items):
    ap = 0
    num_relevant_items = len(relevant_items)
    num_retrieved_relevant = 0

    for i, item in enumerate(recommended_items):
        if item in relevant_items:
            num_retrieved_relevant += 1
            precision_at_i = num_retrieved_relevant / (i + 1)
            ap += precision_at_i

    if num_relevant_items == 0:
        return 0
    else:
        return ap / num_relevant_items

def calculate_map_at_k(users_recommendations, users_ground_truth, k):
    total_map = 0
    num_users = len(users_recommendations)

    for i in range(num_users):
        ap = calculate_average_precision(users_recommendations[i], users_ground_truth[i])
        total_map += ap

    return total_map / num_users


#users_recommendations = [['product1', 'product2', 'product3'], ['product4', 'product5'], ['product6', 'product7']]
#users_ground_truth = [['product1', 'product3'], ['product4'], ['product6']]

k = 3
map_at_k = calculate_map_at_k(users_recommendations, users_ground_truth, k)
print(f"Mean Average Precision at K = {k}: {map_at_k:.2f}")