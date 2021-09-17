import React, { useState } from "react";
import MovieGrid from "../../MovieGrid/MovieGrid";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Search.css";
import SearchBar from "../../SearchBar/SearchBar";

function Search() {
  const [movies, setMovies] = useState([]);
  //const [queryValue, setQueryValue] = useState([]);
  //const [noResultsFound, setNoResultsFound] = useState([]);

  const getMoviesFromQuery = async (query) => {
    //setQueryValue(query);
    console.log(query);
    const res = await fetch(
      `http://10.0.0.158:5000/api/movies/search/${query}`
    );
    const movies = await res.json();
    setMovies(movies);

    //handleEmptyResults(queryValue);
  };

  /* const handleEmptyResults = (value) => {
    setNoResultsFound(<p>{`No results found for '${value}'`}</p>);
  }; */

  return (
    <div>
      <Header />
      <SearchBar onInput={getMoviesFromQuery} />
      <div className="search-toolbar">
        <div className="view-options horizontal-icons">
          <FontAwesomeIcon icon="th-large" inverse />
          <FontAwesomeIcon icon="th-list" inverse />
        </div>
        <div className="search-sorts horizontal-icons">
          <FontAwesomeIcon icon="sort-alpha-down" inverse />
        </div>
      </div>
      {/*noResultsFound*/}
      <MovieGrid movies={movies}></MovieGrid>
      <Footer />
    </div>
  );
}

export default Search;
