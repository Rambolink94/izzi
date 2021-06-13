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
                <li>{/* <a href="#">Home</a> */}</li>
                <li>{/* <a href="#">Genres</a> */}</li>
                <li>{/* <a href="#">Movies</a> */}</li>
                <li>{/* <a href="#">TV Shows</a> */}</li>
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
