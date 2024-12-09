import './App.css'
import styles from "./App.module.css";
import Card from "./components/Card.tsx";
import {useEffect, useState} from "react";
import Song from "./components/Song.tsx";

export type TrackData = {
  track_id: string;
  track_name: string;
  duration_ms: number;
  artist_name: string;
}

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [counter, setCounter] = useState(0);
  const [token, setToken] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TrackData[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [interacting, setInteracting] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setSearchLoading(true);

    fetch(`/api/search?query=${searchQuery}`, {
      signal: controller.signal
    }).then(res => res.json()).then(
      (data: TrackData[]) => {
        setSearchLoading(false);
        setSearchResults(data);
      },
    );

    return () => {
      controller.abort();
    }
  }, [searchQuery]);

  // token

  useEffect(() => {
    if (!token) {
      fetch(`https://accounts.spotify.com/api/token`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials&client_id=db36956f61154accb6c0e5d690c9b3e0&client_secret=2a8f4124cf4b4fdca11f19400ba59a77"
      }).then(res => res.json())
        .then(res => {
          setToken(res.access_token);
        })
    }
  }, [token]);

  // when search input blur, perform recommend
  const [trackId, setTrackId] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<TrackData[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);

  useEffect(() => {
    if (!trackId) return;

    const controller = new AbortController();

    setRecommendationsLoading(true);

    fetch(`/api/recommend?track_id=${trackId}`, {
      signal: controller.signal
    }).then(res => res.json()).then(
      (data: TrackData[]) => {
        setRecommendationsLoading(false);
        setRecommendations(data);
      },
    );

    return () => {
      controller.abort();
    }
  }, [trackId]);

  return (
    <div className={styles.Root}>
      <h1 className={styles.Title} onClick={() => setCounter(counter + 1)}>Dream Team Recommender</h1>
      <div className={styles.Content}>
        <Card className={styles.SearchContainer}>
          <input className={styles.SearchInput} placeholder={"Search For A Track By Title or Artist"}
                 onFocus={() => setShowSearch(true)} onBlur={() => {
            if (!interacting)
              setShowSearch(false);
          }}
                 onChange={event => setSearchQuery(event.target.value)} value={searchQuery}/>
        </Card>
        <div className={styles.SwapContainer} data-search={showSearch}>
          <Card className={styles.Results}>
            {recommendations.length > 0 ? recommendations.map(track => <Song key={track.track_id} trackId={track.track_id}
                                                                         title={track.track_name}
                                                                         artist={track.artist_name}
                                                                         token={token}
                                                                         duration={track.duration_ms}
                                                                         loading={recommendationsLoading}
                                                                         onClick={() => {
                                                                           setTrackId(track.track_id);
                                                                           setShowSearch(false);
                                                                         }}/>) : (
              <div className={styles.NoResult}>
                Start By Searching A Track!
              </div>
            )}
          </Card>

          <Card className={styles.SearchResults} onPointerEnter={() => setInteracting(true)}
                onPointerLeave={() => setInteracting(false)}>
            {searchResults.length > 0 ? searchResults.map(track => <Song key={track.track_id} trackId={track.track_id}
                                                                         title={track.track_name}
                                                                         artist={track.artist_name}
                                                                         token={token}
                                                                         duration={track.duration_ms}
                                                                         loading={searchLoading}
                                                                         onClick={() => {
                                                                           setTrackId(track.track_id);
                                                                           setShowSearch(false);
                                                                         }}/>) : (
              <div className={styles.NoResult}>
                No Results
              </div>
            )}
            {/*<div className={"song-row"}>*/}
            {/*  <div className={"album"}/>*/}
            {/*  <div className={"song-text"}>*/}
            {/*    <p className={"song-title"}>A Generic Song Title</p>*/}
            {/*    <p className={"artist"}>John Doe</p>*/}
            {/*  </div>*/}
            {/*  <p className={"duration"}>00:00</p>*/}
            {/*</div>*/}

            {/*<div className={"song-row"}>*/}
            {/*  <div className={"album"}/>*/}
            {/*  <div className={"song-text"}>*/}
            {/*    <p className={"song-title"}>A Generic Song Title</p>*/}
            {/*    <p className={"artist"}>John Doe</p>*/}
            {/*  </div>*/}
            {/*  <p className={"duration"}>00:00</p>*/}
            {/*</div>*/}

            {/*<div className={"song-row"}>*/}
            {/*  <div className={"album"}/>*/}
            {/*  <div className={"song-text"}>*/}
            {/*    <p className={"song-title"}>A Generic Song Title</p>*/}
            {/*    <p className={"artist"}>John Doe</p>*/}
            {/*  </div>*/}
            {/*  <p className={"duration"}>00:00</p>*/}
            {/*</div>*/}
          </Card>
        </div>
      </div>
      <h5 className="footer">
        Created by "The Dream Team" for Dr. Simmon's FQ ECS 170 Class
      </h5>
    </div>
  )
}

export default App
