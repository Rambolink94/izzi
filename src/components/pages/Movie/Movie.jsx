import { useHistory, useLocation } from "react-router-dom";
import "./Movie.css";

function Movie() {
  const history = useHistory();
  const location = useLocation();

  const extractExtension = (src) => {
    const extension = src.split(".")[1];
    return extension;
  };

  const { title, videoSrc } = location.state;

  return (
    <div className="player-wrapper">
      <video className="player" width="320" height="240" controls autoPlay>
        {console.log(`D:\\Knight's Movies\\${videoSrc}`)}
        <source
          src={`http://10.0.0.158:5000/api/streaming/video/${videoSrc}`}
          type={`video/${extractExtension(videoSrc)}`}
        />
        Browser doesn't support video
      </video>
      <div className="page-functions">
        <button className="transparent-button" onClick={() => history.goBack()}>
          <img
            src={process.env.PUBLIC_URL + "../icons/back-arrow.png"}
            alt="Go Back"
          />
        </button>
        <h1 className="movie-title">{title}</h1>
        <button className="transparent-button options-button">
          <img
            src={process.env.PUBLIC_URL + "../icons/ellipsis-v.svg"}
            alt="Options"
          />
        </button>
      </div>
    </div>
  );
}

export default Movie;
