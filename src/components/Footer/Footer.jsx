import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="footer">
        <nav className="footer-links">
          <Link to="/home">Home</Link>
          {/*<Link to="/genres">Genres</Link>*/}
          <Link to="/movies">Movies</Link>
          <Link to="/tvshows">TV Shows</Link>
        </nav>
        <h2 className="logo-medium">izzi</h2>
        <div className="socials" style={{ visibility: "hidden" }}>
          <img src="https://source.unsplash.com/random/40x40" alt="" />
          <img src="https://source.unsplash.com/random/40x40" alt="" />
          <img src="https://source.unsplash.com/random/40x40" alt="" />
        </div>
      </footer>
    );
  }
}

export default Footer;
