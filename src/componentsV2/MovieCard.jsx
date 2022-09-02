import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, LinearProgress } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ProgressBar from "./ProgressBar";

function MovieCard({ endCard, movieData, genre }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const baseUrl = "https://image.tmdb.org/t/p/";
  const sizeUrl = "w500/";

  return (
    <Link
      to={{
        pathname: endCard
          ? `genre/${genre}`
          : `/movie/${encodeURI(movieData.title)}`,
        state: { movieData, user, genre },
      }}
    >
      <Card sx={{ width: 180, height: "100%", position: "relative" }}>
        {endCard ? (
          <CardContent>
            <ArrowForwardIcon />
          </CardContent>
        ) : (
          <CardMedia
            component="img"
            height="100%"
            image={
              movieData && movieData.poster_path
                ? baseUrl + sizeUrl + movieData.poster_path
                : ""
            }
            alt={movieData ? movieData.title : ""}
          />
        )}
        {!endCard && (
          <ProgressBar
            timeElapsed={movieData.time_elapsed}
            runtime={movieData.runtime}
          />
        )}
      </Card>
    </Link>
  );
}

export default MovieCard;
