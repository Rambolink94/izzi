import React, { Component } from "react";
import "./Header.css";

class Header extends Component {
  state = {};
  render() {
    return (
      <header className="header-wrapper">
        <div className="header-content">
          <h1 className="logo-large">izzi</h1>
          <div className="header-nav-wrapper">
            <nav>
              <ul className="nav-list">
                <li>Home</li>
                <li>Genres</li>
                <li>Movies</li>
                <li>TV Shows</li>
              </ul>
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
