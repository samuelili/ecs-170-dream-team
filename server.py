from os import path

from flask import Flask, send_from_directory, send_file, request
import pandas as pd
import kagglehub

# Download latest version
dataset_path = kagglehub.dataset_download("amitanshjoshi/spotify-1million-tracks")

print("Path to dataset files:", dataset_path)

df = pd.read_csv(
    path.join(dataset_path, "spotify_data.csv"),
    header=0,          # Specify the row to use as column names (default is the first row)
    index_col=None,    # Specify a column to use as the index (default is None)
)

app = Flask(__name__)

@app.route("/api/search", methods=['GET'])
def search():
    query = request.args.get('query')

    return df.sample(6).to_dict(orient='records')

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
