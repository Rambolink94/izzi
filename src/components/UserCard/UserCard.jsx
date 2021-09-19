import React from "react";
import "./UserCard.css";

function UserCard(props) {
  return (
    <div className="user-wrapper">
      <h3 className="username">{props.user.username}</h3>
    </div>
  );
}

export default UserCard;
