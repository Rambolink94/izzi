import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Movie.css";
import { useRef } from "react";

function Movie() {
  const history = useHistory();
  const location = useLocation();

  const baseUrl = "https://image.tmdb.org/t/p/";
  const sizeUrl = "w500/";

  const { movie, user } = location.state;
  const movieElement = useRef();

  const extractExtension = (src) => {
    console.log(location.state);
    const extension = src.split(".")[1];
    return extension;
  };

  const saveMovieProgress = async () => {
    const res = await fetch(
      `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/users/progress`,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          movieId: movie._id,
          timeElapsed: movieElement.current.currentTime / 60,
          runtime: movie.runtime,
        }),
      }
    );
    const success = await res.json();
    console.log(success);
    console.log("Progress " + (success ? "Saved" : "Failed"));
    console.log(movieElement.current.currentTime / 60 + " / " + movie.runtime);
    history.goBack();
  };

  return (
    <div className="player-wrapper">
      <video
        className="player"
        width="320"
        height="240"
        controls
        autoPlay
        poster={`${baseUrl}${sizeUrl}${movie.backdropPath}`}
        ref={movieElement}
      >
        {console.log(`G:\\Knight's Movies\\${movie.videoSrc}`)}
        <source
          src={`http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/streaming/video/${movie.videoSrc}`}
          type={`video/${extractExtension(movie.videoSrc)}`}
        />
        Browser doesn't support video
      </video>
      <div className="page-functions">
        <button className="transparent-button" onClick={saveMovieProgress}>
          <FontAwesomeIcon icon="arrow-alt-circle-left" size="3x" inverse />
        </button>
        <h1 className="movie-title">{movie.title}</h1>
        <button className="transparent-button options-button">
          <FontAwesomeIcon icon="ellipsis-v" size="2x" inverse />
        </button>
      </div>
    </div>
  );
}

export default Movie;
