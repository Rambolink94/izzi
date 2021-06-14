import React, { Component } from "react";
import "./MovieCard.css";

class MovieCard extends Component {
  state = {};
  render() {
    const { posterPath, title } = this.props.movie;

    const baseUrl = "https://image.tmdb.org/t/p/";
    const sizeUrl = "w500/";

    console.log(this.props.movie);
    // Sizing of this component should be dynamic based on the size of the screen
    return (
      <div className="movie-card">
        <img
          className="movie-card-back"
          src={baseUrl + sizeUrl + posterPath}
          alt={title}
        />
        <div className="card-info">
          <h5 className="movie-card-title">{title}</h5>
          <div className="play-button">
            <img
              src={process.env.PUBLIC_URL + "./icons/play-button.png"}
              alt="Play Button"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieCard;
