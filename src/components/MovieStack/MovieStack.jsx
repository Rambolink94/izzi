import React, { Component } from 'react';
import "./MovieStack.css";

class MovieStack extends Component {
    state = {  }
    render() {
        return (
            <div className="stack-wrapper">
                <h4 className="stack-title">{this.props.genre}</h4>
                <div className="stack">
                    <div className="grid">{this.props.children}</div>
                    <div className="arrow-wrapper">
                <div className="right-arrow"><img className="arrow" src={process.env.PUBLIC_URL + "./icons/arrow.png"} alt="Arrow"></img></div>
                    <div className="left-arrow"><img className="arrow" src={process.env.PUBLIC_URL + "./icons/arrow.png"} alt="Arrow"></img></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MovieStack;