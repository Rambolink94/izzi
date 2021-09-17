import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieGrid.css";

function MovieGrid(props) {
  return (
    <div className="grid-parent">
      {props.movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
}

export default MovieGrid;
