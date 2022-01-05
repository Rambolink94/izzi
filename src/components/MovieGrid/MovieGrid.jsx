import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieGrid.css";

function MovieGrid(props) {
  return (
    <div className="grid-parent">
      {props.movies.map((movieData, index) => (
        <MovieCard key={index} movieData={movieData} />
      ))}
    </div>
  );
}

export default MovieGrid;
