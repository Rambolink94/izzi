import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Movie.css";

function Movie() {
  const history = useHistory();
  const location = useLocation();

  const extractExtension = (src) => {
    const extension = src.split(".")[1];
    return extension;
  };

  const baseUrl = "https://image.tmdb.org/t/p/";
  const sizeUrl = "w500/";

  const { title, backdropPath, videoSrc } = location.state;

  return (
    <div className="player-wrapper">
      <video
        className="player"
        width="320"
        height="240"
        controls
        autoPlay
        poster={`${baseUrl}${sizeUrl}${backdropPath}`}
      >
        {console.log(`D:\\Knight's Movies\\${videoSrc}`)}
        <source
          src={`http://10.0.0.158:5000/api/streaming/video/${videoSrc}`}
          type={`video/${extractExtension(videoSrc)}`}
        />
        Browser doesn't support video
      </video>
      <div className="page-functions">
        <button className="transparent-button" onClick={() => history.goBack()}>
          <FontAwesomeIcon icon="arrow-alt-circle-left" size="3x" inverse />
        </button>
        <h1 className="movie-title">{title}</h1>
        <button className="transparent-button options-button">
          <FontAwesomeIcon icon="ellipsis-v" size="2x" inverse />
        </button>
      </div>
    </div>
  );
}

export default Movie;
