import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MovieGrid from "../../MovieGrid/MovieGrid";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Genre.css";

function Category() {
  const location = useLocation();

  const { genre } = location.state;

  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getMovies() {
      const movies = await getMoviesByGenre(genre);
      setMovies(movies);
    }

    getMovies();
  }, []);

  const getMoviesByGenre = async (genre) => {
    const res = await fetch(
      `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/movies/genre/${genre._id}`
    );
    const movies = await res.json();
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
