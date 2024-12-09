from os import path

from flask import Flask, send_from_directory, send_file, request
import pandas as pd
import kagglehub
from fuzzywuzzy import fuzz

# Download latest version
dataset_path = kagglehub.dataset_download("amitanshjoshi/spotify-1million-tracks")

print("Path to dataset files:", dataset_path)

df = pd.read_csv(
    path.join(dataset_path, "spotify_data.csv"),
    header=0,  # Specify the row to use as column names (default is the first row)
    index_col=None,  # Specify a column to use as the index (default is None)
)

app = Flask(__name__)


@app.route("/api/search", methods=['GET'])
def search():
    search_query = request.args.get('query')

    track_name_matches = df[df['track_name'].str.contains(search_query, case=False, na=False)]
    artist_name_matches = df[df['artist_name'].str.contains(search_query, case=False, na=False)]
    matches = pd.concat([track_name_matches, artist_name_matches], ignore_index=True)

    # matches['track_similarity'] = matches['track_name'].apply(lambda x: fuzz.ratio(x.lower(), search_query.lower()))
    # matches['artist_similarity'] = matches['artist_name'].apply(lambda x: fuzz.ratio(x.lower(), search_query.lower()))

    # # Combine match and similarity columns to rank the results
    # matches['total_match_score'] = matches['track_similarity'] + 2 * matches['artist_similarity']

    # Sort by the best match
    # matches = matches.sort_values(by='total_match_score', ascending=False)
    matches = matches.sort_values(by='popularity', ascending=False)

    return matches[:6].to_dict(orient='records')
    # Display the sorted DataFrame with best matches


@app.route("/api/recommend", methods=['GET'])
def recommend():
    track_id = request.args.get('track_id')

    return df.sample(6).to_dict(orient='records')


@app.route('/')
def index():
    return send_file('web/dist/index.html')


@app.route('/<path:path>')
def web_files(path):
    # Using request args for path will expose you to directory traversal attacks
    return send_from_directory('web/dist', path)
