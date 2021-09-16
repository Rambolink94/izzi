import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

function Header(props) {
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
          <FontAwesomeIcon icon="search" className="search-icon" inverse />
          <FontAwesomeIcon icon="bell" className="notification-icon" inverse />
          <div className="profile-pic-small">
            <p className="profile-text">KS</p>
            <img
              hidden
              className="profile-image"
              src="https://source.unsplash.com/random/50x50"
              alt="profile-pic"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
