import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MovieCard.css";

function MovieCard(props) {
  const { posterPath, title } = props.movie;

  const baseUrl = "https://image.tmdb.org/t/p/";
  const sizeUrl = "w500/";

  useEffect(() => {}, []);

  // Sizing of this component should be dynamic based on the size of the screen
  return (
    <div className="movie-card-wrapper">
      <div className="movie-card">
        <img
          className="movie-card-back"
          src={baseUrl + sizeUrl + posterPath}
          alt={title}
        />
        <Link
          to={{ pathname: `/movie/${props.movie._id}`, state: props.movie }}
        >
          {console.log(props.movie)}
          <div className="card-info">
            <h5 className="movie-card-title">{title}</h5>
            <div className="play-button">
              {props.children}
              <FontAwesomeIcon icon="play" size="3x" color="white" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;
