import React from "react";
import "./MovieInfoCard.css";

function MovieInfoCard({ title, description, backdrop }) {
  return (
    <div className="movie-info-card-wrapper">
      <img src={backdrop} />
      <div className="movie-info-pannel">
        <h4 className="movie-title">{title}</h4>
        <p className="movie-description">{description}</p>
      </div>
    </div>
  );
}

export default MovieInfoCard;
