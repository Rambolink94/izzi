import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MovieGrid from "../../MovieGrid/MovieGrid";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Genre.css";
import axios from "axios";

function Category() {
  const location = useLocation();

  const { genre } = location.state;
  const user = location.state.user
    ? location.state.user
    : JSON.parse(localStorage.getItem("user"));

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const movies = await getMoviesByGenre(genre);
      setMovies(movies);
    }

    getMovies();
  }, []);

  const getMoviesByGenre = async (genre) => {
    const response = await axios({
      method: "GET",
      url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/movies/all/${genre.id}/${user.id}`,
    });
    const movies = response.data;
    return movies;
  };

  return (
    <div>
      <Header />
      <div className="genre-toolbar">
        <h1 className="genre-title">{genre.name}</h1>
        <div>
          <p>FILTERS</p>
        </div>
      </div>
      <MovieGrid movies={movies}></MovieGrid>
      <Footer />
    </div>
  );
}

export default Category;
