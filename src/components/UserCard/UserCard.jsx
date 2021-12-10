import React from "react";
import "./UserCard.css";

function UserCard(props) {
  return (
    <div className="user-wrapper">
      <div className="user-image">
        <img
          src="https://source.unsplash.com/random/400x400"
          alt="profile-image"
        />
      </div>
      <h3 className="username">{props.user.username}</h3>
    </div>
  );
}

export default UserCard;
