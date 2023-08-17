import warnings
import numpy as np
import pandas as pd
from sklearn.metrics import mean_squared_error
from scipy.sparse.linalg import svds
warnings.filterwarnings('ignore')
import os

product_data_csv_path = os.path.join(os.getcwd(), 'gridDB', 'productsDB.csv')

def top_n_products(num_recommendations):
    df = pd.read_csv(product_data_csv_path)
    recommendations = df.sort_values(by='avg_rating', ascending=False)
    return recommendations['product_id'][:num_recommendations].tolist()