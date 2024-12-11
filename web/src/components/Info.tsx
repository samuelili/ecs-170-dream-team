import Card from "./Card.tsx";

import styles from "./Info.module.css";
import image1 from "./images/image1.png";
import image2 from "./images/image2.png";

const Info = ({onExit}: { onExit: () => void }) => {
  return (
    <>
      <button onClick={onExit}>
        Go Back
      </button>
      <Card className={styles.Container}>
        <h2 className={styles.Header}>Overview</h2>
        Popular music streaming services, such as Spotify, possess recommendation engines that often struggle to appeal
        to users. Commonly reported struggles include repeated dissatisfaction with recommended playlists due to the
        excessive curation based on recent listening habits and neglecting broader exploration. Consequently, such
        limitations may reduce the platform’s ability to encourage users to broaden their musical preferences and
        exposure to various genres, potentially impacting engagement and retention. Our goal with “The Dream Team
        Recommender” model is to create a balance in the exploration-exploitation tradeoff, reduce the recommendation
        fatigue felt by users, and recommend new music a user may enjoy.

        <h2 className={styles.Header}>Technologies</h2>
        The technology that we used for this algorithm was the K-Nearest Neighbor algorithm, which constructs a&nbsp;
        <b>n</b>-dimensional space, with <b>n</b> being the number of features that the dataset it is operating on has.
        The algorithm
        then takes some kind of distance metric (for our purposes, Euclidean vs cosine distance) to calculate the
        distances between each song and generate the recommendations based on the five closest neighbours to the
        original song the user inputs to get recommendations .

        <h2 className={styles.Header}>Challenges and Resolutions</h2>
        One challenge we ran into was that using Euclidean distance for feature similarity doesn’t always align with
        user preferences, as it doesn’t account for directional similarities in high-dimensional space. When we don’t
        consider the directional similarities, a slightly faster tempo or a higher energy level could be classified as
        less similar, even if the overall “feel” of the songs are similar. Recommendations were also lacking diversity,
        as we were only considering the nearest neighbors. To resolve this, we tested and evaluated cosine distance
        metric against Euclidean and combined content-based recommendations with popularity or user-behavior data to
        address diversity. Another challenge was that the K-Nearest Neighbor algorithm’s time complexity increases with
        the size of the dataset, making real-time recommendations computationally expensive. In a real application, the
        Flask server might struggle to handle a high volume of requests. For this challenge we reduced dataset
        dimensionality by selecting key features and optimized n_neighbors parameter for balanced performance. After
        working with our model and reading about other implementations in this field, we found that we could have
        explored ANN libraries like faiss or optimized implementations to scale further.

        <h2 className={styles.Header}>Visual Diagrams:</h2>

        <img src={image2} className={styles.Figure} alt={"foo"}/>

        <p className={styles.FigureText}>Figure 1: Radial visualization of all 10 different features in comparing the
          original song selected to the
          recommendations provided by the KNN.</p>

        <img src={image1} style={{width: 600}} alt={"foo"} className={styles.Figure}/>

        <p className={styles.FigureText}>Figure 2: Evaluation data collected from subjective user feedback reveals a
          narrow advantage for using the
          Euclidean metric over the cosine metric in the KNN’s construction.</p>


        <h2 className={styles.Header}>Group Member Contributions</h2>
        <p><b>Zoran:</b> testing model, comparing our model to actual streaming platforms, provided outlook on model</p>

        <p><b>Eric:</b> Model evaluation</p>
        <p><b>Jahnavi:</b> Helped with write-ups, presentation slides; tested the model, wrote abstract</p>
        <p><b>Esther:</b> Helped with presentation slides and speaker notes, proofreading, Q&A participation</p>
        <p><b>Ryan:</b> Developed the KNN algorithm and its adjusted feature weights</p>
        <p><b>Samuel:</b> Developed the full-stack application for presentation</p>
        <p><b>Pili:</b> Proofreading, testing model, project coordination with team</p>

      </Card>
    </>
  );
}

export default Info;