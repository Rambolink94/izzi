import React, { Component } from "react";
import "./MovieCard.css";

class MovieCard extends Component {
  state = {};
  render() {
    const { poster, title } = this.props.movie;

    // Sizing of this component should be dynamic based on the size of the screen
    return (
      <div className="movie-card">
        <img className="movie-card-back" src={poster} alt={title} />
        <div className="card-info">
          <h5 className="movie-card-title">{title}</h5>
          <div className="play-button">
            <img
              src={process.env.PUBLIC_URL + "./icons/play-button.png"}
              alt=""
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
