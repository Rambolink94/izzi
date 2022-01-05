import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import UserCard from "../../UserCard/UserCard";
import UserCreationModal from "../../UserCreationModal/UserCreationModal";
import "./SelectUser.css";
import axios from "axios";

function SelectUser() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const [isModalActive, setIsModalActive] = useState([]);

  useEffect(() => {
    async function getUsers() {
      const users = await getUsersHelper();
      console.log(users);
      setUsers(users);
    }

    getUsers();

    setIsModalActive(false);
  }, []);

  const getUsersHelper = async () => {
    const response = await axios({
      method: "get",
      url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/users/all`,
    });
    return response.data;
  };

  const createNewUser = async (username, allowAdultContent) => {
    console.log(username + " | " + allowAdultContent);
    const data = await axios({
      method: "post",
      url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/users/create`,
      data: JSON.stringify({
        username: username,
        allowAdultContent: allowAdultContent,
      }),
    });
    const users = await getUsersHelper();
    showUserModal(false);
    setUsers(users);
  };

  const showUserModal = (user = null) => {
    setCurrentUser(user);
    setIsModalActive(true);
  };

  const closeModal = () => {
    console.log("Close Modal");
    setIsModalActive(false);
  };

  const storeUser = (user) => {
    console.log("USER:", user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  return (
    <div className="select-wrapper">
      <Header simplify={true} />
      <div className="grid-wrapper">
        <h1 className="select-user">Select User</h1>
        <div className="user-grid">
          {users.map((user, index) => {
            console.log(user);
            return (
              <div key={index} onClick={() => storeUser(user)}>
                <Link to={{ pathname: "/home" }} state={{ user }}>
                  <UserCard user={user} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      {isModalActive ? (
        <UserCreationModal
          user={currentUser}
          closeModal={closeModal}
          onUserCreate={createNewUser}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default SelectUser;
