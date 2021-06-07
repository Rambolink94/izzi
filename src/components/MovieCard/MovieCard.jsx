import React, { Component } from 'react';
import "./MovieCard.css";

class MovieCard extends Component {
    state = {  }
    render() {
        const { backImage, title } = this.props;
        return (
            <div className="movie-card">
                <img className="movie-card-back" src={backImage} alt={title} />
                <div className="card-info">
                    <h5 className="movie-card-title">{title}</h5>
                    <div className="play-button">
                        <img src={process.env.PUBLIC_URL + "./icons/play-button.png"} alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieCard;