import warnings
import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error
from scipy.sparse.linalg import svds
warnings.filterwarnings('ignore')
import os

product_ratings_csv_path = os.path.join(os.getcwd(), 'gridDB', 'productRatings.csv')

def top_n_products(num_recommendations, min_interaction=5):
    df = pd.read_csv(product_ratings_csv_path, header=None)
    df.columns = ['user_id', 'product_id', 'rating']
    counts = df['user_id'].value_counts()
    df_final = df[df['user_id'].isin(counts[counts >= 50].index)]
    final_ratings_matrix = df_final.pivot(index='user_id', columns='product_id', values='rating').fillna(0)
    average_rating = df_final.groupby('product_id').mean()['rating']
    count_rating = df_final.groupby('product_id').count()['rating']
    final_rating = pd.DataFrame({'avg_rating': average_rating, 'rating_count': count_rating})
    final_rating = final_rating.sort_values(by='avg_rating', ascending=False)
    final_ratings_matrix['user_index'] = np.arange(0, final_ratings_matrix.shape[0])
    final_ratings_matrix.set_index(['user_index'], inplace=True)
    recommendations = final_rating[final_rating['rating_count'] > min_interaction]
    recommendations = recommendations.sort_values('avg_rating', ascending=False)
    return recommendations.index[:num_recommendations]