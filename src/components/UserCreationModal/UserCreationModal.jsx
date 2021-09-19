import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "./UserCreationModal.css";

function UserCreationModal(props) {
  const [isChecked, setIsChecked] = useState(true);
  const [username, setUsername] = useState("");
  const [inputFailed, setInputFailed] = useState(false);

  const toggleCheck = () => {
    setIsChecked(!isChecked);
  };

  const onInputChanged = (event) => {
    const value = event.target.value;
    setInputFailed(false);
    setUsername(value);
  };

  const createNewUser = () => {
    if (username.length <= 0) {
      setInputFailed(true);
    } else {
      props.onUserCreate(username, isChecked);
      props.closeModal();
    }
  };

  return (
    <div className="modal-parent">
      <div className="modal-container">
        <h2>Create User</h2>
        <div className="user-details">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Username..."
              onInput={onInputChanged}
              className={"username" + (inputFailed ? " bad-input" : "")}
            />
          </div>
          <div className="input-wrapper check-container">
            <label>
              Mature Content
              <input
                key={Math.random()}
                type="checkbox"
                name="allow-adult-content"
                checked={isChecked}
                onChange={(e) => {}}
              />
              <span className="checkmark" onClick={toggleCheck}>
                <FontAwesomeIcon icon="check" className="check" />
              </span>
            </label>
          </div>
          <div className="input-wrapper">
            <button className="btn primary" onClick={createNewUser}>
              Create User
            </button>
            <button className="btn" onClick={props.closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCreationModal;
