import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
import kagglehub
import os
import numpy as np

path = kagglehub.dataset_download("amitanshjoshi/spotify-1million-tracks")
# print("Path to dataset files:", path)
# path's csv file titled spotify_data.csv
df = pd.read_csv(os.path.join(path, "spotify_data.csv"))

# print("Dataset shape:", df.shape)
# print("\nFirst few rows:")
# print(df.head())
# print("\nColumns available:")
# print(df.columns.tolist())

feature_columns = [
    'popularity',
    'danceability',
    'energy',
    'loudness',
    'speechiness',
    'acousticness',
    'instrumentalness',
    'liveness',
    'valence',
    'tempo'
]

# Verify features exist in dataset and handle missing values
print("\nChecking for missing values in features:")
print(df[feature_columns].isnull().sum())

ADJUSTED_FEATURE_WEIGHTS = {
    'popularity': 2.0,     # Remains high - ensures recommendations are generally well-received
    'danceability': 1.5,   
    'energy': 2.0,         
    'valence': 1.75,        
    'tempo': 1.5,          
    'loudness': 1.25,       
    'speechiness': 1,     # baseline of 1
    'acousticness': 0.5,   
    'instrumentalness': 0.5,  
    'liveness': 0.5       # Remains low - liveliness has little effect compared to the other features 
}

# Drop rows with missing values if any
df = df.dropna(subset=feature_columns)

# Extract and scale features
X = df[feature_columns].values
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

weights = np.array([ADJUSTED_FEATURE_WEIGHTS[col] for col in feature_columns])
weighted_features = X_scaled * weights

# In testing/evaluation, we'll be comparing the euclidean and the cosine metric,
metrics = {
    'euclidean',
    'cosine'
}

# Create and fit KNN model
n_neighbors = 6  # 5 recommendations + 1 for the input song
knn = NearestNeighbors(n_neighbors=n_neighbors, metric='euclidean')
knn.fit(weighted_features)

# Create recommendation function
def get_song_recommendations(song_idx=None):
    """
    Get song recommendations based on song name, artist, or index
    """
    if song_idx is not None:
        idx = song_idx
    else:
        return []

    # Get the song's features
    song_features = X_scaled[idx].reshape(1, -1)

    # Find nearest neighborslol 
    distances, indices = knn.kneighbors(song_features)

    # Prepare recommendations
    recommendations = pd.DataFrame({
        'track_name': df.iloc[indices[0][1:]]['track_name'].values,
        'artist_name': df.iloc[indices[0][1:]]['artist_name'].values,
        'duration_ms': df.iloc[indices[0][1:]]['duration_ms'].values,
        'track_id': df.iloc[indices[0][1:]]['track_id'].values,
        'distance': distances[0][1:]
    })

    # Print original song info
    # print(f"\nGetting recommendations for: {df.iloc[idx]['track_name']} by {df.iloc[idx]['artist_name']}")

    # Print recommendations
    # print("\nRecommended songs:")
    # for _, row in recommendations.iterrows():
    #     print(f"- {row['track_name']} by {row['artist_name']} (Distance: {row['distance']:.3f})")

    return recommendations