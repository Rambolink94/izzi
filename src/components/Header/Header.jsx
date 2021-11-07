import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.css";

function Header(props) {
  const [userInitials, setUserInitials] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const nameParts = user.username.split(" ");
      let initials = "";
      for (let i = 0; i < nameParts.length; i++) {
        if (i > 1) break;

        initials += nameParts[i].charAt(0);
      }
      setUserInitials(initials.toUpperCase());
    }
  }, []);

  return (
    <header className="header-wrapper">
      <div className="header-content">
        <h1 className="logo-large">izzi</h1>
        <div
          className={"header-nav-wrapper" + (props.simplify ? " simplify" : "")}
        >
          <nav className="nav-list">
            <Link to="/home">Home</Link>
            {/*<Link to="/genres">Genres</Link>*/}
            <Link to="/movies">Movies</Link>
            <Link to="/tvshows">TV Shows</Link>
          </nav>
        </div>
        <div
          className={
            "header-user-wrapper" + (props.simplify ? " simplify" : "")
          }
        >
          <Link to="/search">
            <FontAwesomeIcon icon="search" className="search-icon" inverse />
          </Link>
          <FontAwesomeIcon icon="bell" className="notification-icon" inverse />
          <div className="profile-pic-small">
            <p className="profile-text">{userInitials ? userInitials : "IZ"}</p>
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
