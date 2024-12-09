import {BaseHTMLAttributes, useEffect, useState} from "react";

const Song = ({trackId, title, artist, token, duration, loading, ...props}: BaseHTMLAttributes<HTMLDivElement> & {
  trackId: string,
  title: string,
  artist: string,
  token: string,
  duration: number,
  loading?: boolean
}) => {
  const [displayImage, setDisplayImage] = useState<{
    url: string,
    width: number,
    height: number,
  } | null>(null);

  useEffect(() => {
    fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then(res => res.json())
      .then(data => {
        if (!data?.album?.images)
          return;

        const images = data.album.images as ({
          url: string,
          width: number,
          height: number,
        })[];

        // find smallest area
        let displayImage: typeof images[0] | null = null;
        for (const image of images) {
          if (!displayImage)
            displayImage = image;
          else if (displayImage.width * displayImage.height > image.width * image.height) {
            displayImage = image;
          }
        }
        setDisplayImage(displayImage);
      })
  }, [token, trackId]);

  const seconds = Math.floor(duration / 1000) % 60;
  const minutes = Math.floor(duration / (60 * 1000)) % 60;

  return (
    <div className={"song-row"} style={{
      opacity: loading ? 0.3 : 1,
    }} {...props}>
      <div className={"album-container"}>
        {displayImage && <img className={"album"} src={displayImage?.url} loading={"eager"} alt={trackId}/>}
      </div>
      <div className={"song-text"}>
        <p className={"song-title"}>{title}</p>
        <p className={"artist"}>{artist}</p>
      </div>
      <p className={"duration"}>{minutes}:{seconds < 10 && "0"}{seconds}</p>
    </div>
  )
}

export default Song;