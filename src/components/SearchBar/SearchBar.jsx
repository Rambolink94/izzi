import React, { useState } from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [searchValue, setSearchValue] = useState([]);

  const onInputChanged = (event) => {
    const value = event.target.value;
    props.onInput(value);
    setSearchValue(value);
  };

  return (
    <div className="searchbar-wrapper">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchValue}
        onInput={onInputChanged}
        autoFocus
      />
    </div>
  );
}

export default SearchBar;
