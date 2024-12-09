import './App.css'
import styles from "./App.module.css";
import Card from "./components/Card.tsx";
import {useEffect, useRef, useState} from "react";
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

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (searchQuery.length === 0) return;

    const controller = new AbortController();

    setSearchLoading(true);

    // Clear the previous timeout when input changes
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to update throttled input after 500ms
    timeoutRef.current = setTimeout(() => {
      fetch(`/api/search?query=${searchQuery}`, {
        signal: controller.signal
      }).then(res => res.json()).then(
        (data: TrackData[]) => {
          setSearchLoading(false);
          setSearchResults(data);
        },
      );
    }, 200); // 500ms delay

    return () => {
      controller.abort();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
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
  const [track, setTrack] = useState<TrackData | null>(null);
  const [recommendations, setRecommendations] = useState<TrackData[]>([]);
  const [recommendationsLoading, setRecommendationsLoading] = useState(false);

  useEffect(() => {
    if (!track) return;

    const controller = new AbortController();

    setRecommendationsLoading(true);

    fetch(`/api/recommend?track_id=${track.track_id}`, {
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
  }, [track]);

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
          <div className={styles.ResultsContainer}>{track && (
            <Card>
              <h5 style={{marginLeft: "0.30625rem", marginBottom: "0.25rem", marginTop: "0.125rem"}}>Showing
                Recommendations For:</h5>
              <Song trackId={track.track_id} artist={track.artist_name} duration={track.duration_ms} token={token}
                    title={track.track_name}/>

            </Card>
          )}
            <Card className={styles.Results}>
              {recommendations.length > 0 ? recommendations.map(track => <Song key={track.track_id}
                                                                               trackId={track.track_id}
                                                                               title={track.track_name}
                                                                               artist={track.artist_name}
                                                                               token={token}
                                                                               duration={track.duration_ms}
                                                                               loading={recommendationsLoading}/>) : (
                <div className={styles.NoResult}>
                  {recommendationsLoading ? "Loading..." : "Start By Searching A Track!"}
                </div>
              )}
            </Card>
          </div>

          <Card className={styles.SearchResults} onPointerEnter={() => setInteracting(true)}
                onPointerLeave={() => setInteracting(false)}>
            {searchResults.length > 0 ? searchResults.map((track, i) => <Song key={track.track_id + i}
                                                                              trackId={track.track_id}
                                                                              title={track.track_name}
                                                                              artist={track.artist_name}
                                                                              token={token}
                                                                              duration={track.duration_ms}
                                                                              loading={searchLoading}
                                                                              onClick={() => {
                                                                                setTrack(track);
                                                                                setShowSearch(false);
                                                                              }}/>) : (
              <div className={styles.NoResult}>
                {searchLoading ? "Loading..." : "No Results"}
              </div>
            )}
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
