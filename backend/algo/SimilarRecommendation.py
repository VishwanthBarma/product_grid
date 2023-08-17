import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.filterwarnings('ignore')
import os
product_ratings_csv_path = os.path.join(os.getcwd(), 'gridDB', 'productRatings.csv')



def similar_users(user_index, interactions_matrix):
    similarity = []
    for user in range(0, interactions_matrix.shape[0]):
        sim = cosine_similarity([interactions_matrix.loc[user_index]], [interactions_matrix.loc[user]])
        similarity.append((user, sim))
    similarity.sort(key=lambda x: x[1], reverse=True)
    most_similar_users = [tup[0] for tup in similarity]
    similarity_score = [tup[1] for tup in similarity]
    most_similar_users.remove(user_index)
    similarity_score.remove(similarity_score[0])
    return most_similar_users, similarity_score


def similarRecommendations(user_index, num_recommendations):
    df = pd.read_csv(product_ratings_csv_path)
    counts = df['user_id'].value_counts()
    df_final = df[df['user_id'].isin(counts[counts >= 50].index)]
    final_ratings_matrix = df_final.pivot(index='user_id', columns='product_id', values='rating').fillna(0)
    average_rating = df_final.groupby('product_id').mean()['rating']
    count_rating = df_final.groupby('product_id').count()['rating']
    final_rating = pd.DataFrame({'avg_rating': average_rating, 'rating_count': count_rating})
    final_rating = final_rating.sort_values(by='avg_rating', ascending=False)
    final_ratings_matrix['user_index'] = np.arange(0, final_ratings_matrix.shape[0])
    final_ratings_matrix.set_index(['user_index'], inplace=True)
    
    most_similar_users = similar_users(user_index, final_ratings_matrix)[0]
    prod_ids = set(list(final_ratings_matrix.columns[np.where(final_ratings_matrix.loc[user_index] > 0)]))
    recommendations = []
    observed_interactions = prod_ids.copy()
    for similar_user in most_similar_users:
        if len(recommendations) < num_recommendations:
            similar_user_prod_ids = set(list(final_ratings_matrix.columns[np.where(final_ratings_matrix.loc[similar_user] > 0)]))
            recommendations.extend(list(similar_user_prod_ids.difference(observed_interactions)))
            observed_interactions = observed_interactions.union(similar_user_prod_ids)
        else:
            break
    return recommendations[:num_recommendations]