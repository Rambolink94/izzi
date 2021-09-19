import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import UserCard from "../../UserCard/UserCard";
import UserCreationModal from "../../UserCreationModal/UserCreationModal";
import "./SelectUser.css";

function SelectUser(props) {
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
    const res = await fetch(`http://10.0.0.158:5000/api/users`);
    const users = await res.json();
    return users;
  };

  const createNewUser = async (username, allowAdultContent) => {
    console.log(username + " | " + allowAdultContent);
    const res = await fetch(`http://10.0.0.158:5000/api/users/`, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        allowAdultContent: allowAdultContent,
      }),
    });
    await res.json();
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

  return (
    <div className="select-wrapper">
      <Header simplify={true} />
      <div className="grid-wrapper">
        <h1 className="select-user">Select User</h1>
        <div className="user-grid">
          {users.map((user, index) => {
            return (
              <Link to={{ pathname: `/home`, state: { user: user } }}>
                <div key={index} className="user-grid-element">
                  <UserCard key={index} user={user} />
                </div>
              </Link>
            );
          })}
          <div
            className="user-grid-element add-user-button"
            onClick={showUserModal}
          >
            <FontAwesomeIcon icon="plus" inverse className="element-icon" />
          </div>
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
