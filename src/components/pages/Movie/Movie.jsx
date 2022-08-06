import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Movie.css";
import { useRef } from "react";

function Movie() {
  const history = useHistory();
  const location = useLocation();

  const baseUrl = "https://image.tmdb.org/t/p/";
  const sizeUrl = "w500/";

  console.log(location.state);
  const { movieData, user } = location.state;
  const movieElement = useRef();

  const extractExtension = (src) => {
    const extension = src.split(".")[1];
    return extension;
  };

  const saveMovieProgress = async () => {
    console.log("HERE");
    const response = await axios({
      method: "POST",
      url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/users/updateProgress`,
      data: {
        userId: user.id,
        movieId: movieData.id,
        timeElapsed: movieElement.current.currentTime / 60,
      },
    });
    console.log(response.data);
    const success = response.data;
    console.log(success);
    console.log("Progress " + (success ? "Saved" : "Failed"));
    console.log(
      movieElement.current.currentTime / 60 + " / " + movieData.runtime
    );
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
        poster={`${baseUrl}${sizeUrl}${movieData.backdrop_path}`}
        ref={movieElement}
      >
        <source
          src={`http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/movies/stream/${movieData.video_src}`}
          type={`video/${extractExtension(movieData.video_src)}`}
        />
        Browser doesn't support video
      </video>
      <div className="page-functions">
        <button className="transparent-button" onClick={saveMovieProgress}>
          <FontAwesomeIcon icon="arrow-alt-circle-left" size="3x" inverse />
        </button>
        <h1 className="movie-title">{movieData.title}</h1>
        <button className="transparent-button options-button">
          <FontAwesomeIcon icon="ellipsis-v" size="2x" inverse />
        </button>
      </div>
    </div>
  );
}

export default Movie;
