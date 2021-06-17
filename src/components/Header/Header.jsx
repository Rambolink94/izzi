import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <header className="header-wrapper">
        <div className="header-content">
          <h1 className="logo-large">izzi</h1>
          <div className="header-nav-wrapper">
            <nav className="nav-list">
              <Link to="/">Home</Link>
              <Link to="/genres">Genres</Link>
              <Link to="/movies">Movies</Link>
              <Link to="/tvshows">TV Shows</Link>
            </nav>
          </div>
          <div className="header-user-wrapper">
            <img
              className="search-icon"
              src="https://source.unsplash.com/random/40x40"
              alt="profile-pic"
            />
            <img
              className="profile-pic-small"
              src="https://source.unsplash.com/random/50x50"
              alt="profile-pic"
            />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
