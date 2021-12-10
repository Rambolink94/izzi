import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MovieInfoCard from "../MovieInfoCard/MovieInfoCard";
import "./MovieCard.css";

function MovieCard({ movie }) {
  console.log("Movie", movie);
  const user = JSON.parse(localStorage.getItem("user"));
  const { posterPath, title } = movie;
  const [progress, setProgress] = useState(null);
  const [isHovering, setIsHovering] = useState(false);

  const baseUrl = "https://image.tmdb.org/t/p/";
  const sizeUrl = "w500/";

  useEffect(() => {
    async function getMovieProgress(user) {
      const { timeElapsed } = await getMovieProgressHelper(user);
      setProgress(timeElapsed ? timeElapsed : 0);
      if (progress > 0)
        console.log(
          "Progress:",
          `(${progress} / ${movie.runtime}) * 100 =`,
          Math.round((progress / movie.runtime) * 100)
        );
    }
    getMovieProgress(user);
  }, []);

  const getMovieProgressHelper = async (user) => {
    if (!user) return { timeElapsed: 0 };
    const res = await fetch(
      `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/users/progress/${user._id}/${movie._id}`
    )
      .then((res) => {
        return res.json();
      })
      .catch((error) => {
        console.error(
          `Could not pull progress bar for movie with id ${movie.id} with user ${user.id}`
        );
      });
    console.log(res);
    return res;
  };

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
          pathname: `/movie/${movie._id}`,
          state: { movie, user },
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
              display: `${progress != 0 ? "" : "none"}`,
            }}
          >
            <span
              className="progress-bar"
              style={{
                width: `${
                  progress != 0
                    ? Math.round((progress / movie.runtime) * 100)
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
