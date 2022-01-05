import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieInfoCard from "../MovieInfoCard/MovieInfoCard";
import "./MovieCard.css";

function MovieCard({ movieData }) {
  //console.log("Movie", movieData);
  const user = JSON.parse(localStorage.getItem("user"));
  const { poster_path: posterPath, title } = movieData;
  const [isHovering, setIsHovering] = useState(false);

  const baseUrl = "https://image.tmdb.org/t/p/";
  const sizeUrl = "w500/";

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  // Sizing of this component should be dynamic based on the size of the screen
  return (
    <div className="movie-card-wrapper">
      {isHovering && <MovieInfoCard />}
      <Link
        to={{
          pathname: `/movie/${encodeURI(movieData.title)}`,
          state: { movieData, user },
        }}
      >
        <div
          className="movie-card"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <img
            className="movie-card-back"
            src={baseUrl + sizeUrl + posterPath}
            alt={title}
          />
          <div
            className="progress-bar-background"
            style={{
              display: `${
                movieData.time_elapsed && movieData.time_elapsed != 0
                  ? ""
                  : "none"
              }`,
            }}
          >
            <span
              className="progress-bar"
              style={{
                width: `${
                  movieData.time_elapsed != 0
                    ? Math.round(
                        (movieData.time_elapsed / movieData.runtime) * 100
                      )
                    : 0
                }%`,
              }}
            ></span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
