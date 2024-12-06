import './App.css'
import styles from "./App.module.css";
import Card from "./components/Card.tsx";
import {useEffect, useState} from "react";
import Song from "./components/Song.tsx";

function App() {
  const [showSearch, setShowSearch] = useState(false);
  const [counter, setCounter] = useState(0);
  const [token, setToken] = useState("");

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

  return (
    <div className={styles.Root}>
      <h1 className={styles.Title} onClick={() => setCounter(counter + 1)}>Dream Team Recommender</h1>
      <div className={styles.Content}>
        <Card>
          <input className={styles.SearchInput} placeholder={"Search For A Track By Title or Artist"}
                 onFocus={() => setShowSearch(true)} onBlur={() => setShowSearch(false)}/>
        </Card>
        <div className={styles.SwapContainer} data-search={showSearch}>
          <Card className={styles.Results}>
            {/*<div className={styles.NoResult}>*/}
            {/*Start By Searching A Track!*/}
            {/*</div>*/}
            <Song trackId={"53QF56cjZA9RTuuMZDrSA6"} title={"A Generic Song Title"} artist={"John Doe"} duration={123456} token={token}/>

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
          <Card className={styles.SearchResults}>
            <div className={styles.NoResult}>
              No Results
            </div>
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
