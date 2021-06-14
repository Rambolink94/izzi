import React, { Component } from "react";
import "./Footer.css";

class Footer extends Component {
  state = {};
  render() {
    return (
      <footer className="footer">
        <nav className="footer-links">
          <ul>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
            <li>Link</li>
          </ul>
        </nav>
        <h2 className="logo-medium">izzi</h2>
        <div className="socials">
          <img src="https://source.unsplash.com/random/40x40" alt="" />
          <img src="https://source.unsplash.com/random/40x40" alt="" />
          <img src="https://source.unsplash.com/random/40x40" alt="" />
        </div>
      </footer>
    );
  }
}

export default Footer;
