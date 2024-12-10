# Dream Team Recommender
Created by "The Dream Team" for Dr. Simmon's FQ ECS 170 Class at University of California - Davis.

This is a small and simple web app that provides song recommendations given a single song. It uses K-means to create 5 song recomendations from the Kaggle Dataset "Spotify 1 Million Tracks"

## Members
- Samuel Li
- Esther C.
- Eric Sun
- Jahnavi Vishnubhotla
- Ryan Hang
- Pili Yang
- Zoran Yong

# Abstract

There are multiple music streaming services, many of which have their own methods of recommending tracks for users to add to their playlists and listen to. But because of bias and recommendation fatigue (users becoming exhausted and disillusioned with the recommendations they get which are too predictable), it’s common for users to interact less with the recommendation features of the apps they use. This project strives to take a step in a better direction in the realm of new music suggestions by implementing a KNN/K-Nearest Neighbours algorithm which helps users discover new songs based on their preferences. The system analyzes different audio features from Spotify, like energy, tempo, and danceability, to find songs similar to the ones users already enjoy.  It works by calculating the distance between songs in a multi-dimensional space of features, allowing for personalized recommendations that feel more intuitive and customized. Our algorithm also prioritizes certain features like popularity and energy, making the recommendations more in line with common music preferences. We took into account some user opinions and feedback on the performance of the recommendations with a survey as well. This project was built with TypeScript for the frontend and Flask for the backend; the platform makes it easy for users to search and find new tracks that match their favorite music.

# To Run
Execute the `start.sh` file found at the root of this project

```sh
./start.sh
```

# To Build Web
```sh
cd web

yarn

yarn build
```