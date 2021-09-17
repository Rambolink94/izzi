import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowAltCircleLeft,
  faArrowLeft,
  faPlay,
  faChevronLeft,
  faChevronRight,
  faInfoCircle,
  faSearch,
  faEllipsisV,
  faBell,
  faFilter,
  faSort,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faThList,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MovieStack from "./components/MovieStack/MovieStack";
import Movie from "./components/pages/Movie/Movie";
import Genre from "./components/pages/Genre/Genre";
import Search from "./components/pages/Search/Search";

library.add(
  faArrowAltCircleLeft,
  faArrowLeft,
  faPlay,
  faChevronLeft,
  faChevronRight,
  faInfoCircle,
  faSearch,
  faEllipsisV,
  faBell,
  faFilter,
  faSort,
  faSortAlphaDown,
  faSortAlphaDownAlt,
  faThList,
  faThLarge
);

function App() {
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    async function setupStacks() {
      const stacks = await getMovieStacks();
      setStacks(stacks);
    }

    setupStacks();
  }, []);

  const getMovieStacks = async () => {
    const stacks = [];
    // get genres
    const res = await fetch("http://10.0.0.158:5000/api/genres");
    const genres = await res.json();

    await Promise.all(
      genres.map(async (genre) => {
        const res = await fetch(
          `http://10.0.0.158:5000/api/movies/genre/${genre._id}`
        );
        const movies = await res.json();
        stacks.push({ genre: genre, movies: movies });
      })
    );
    return stacks;
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Default path */}
          <Route exact path="/">
            <Header />
            {stacks.map((stack, index) => {
              if (stack.movies.length > 0) {
                return (
                  <MovieStack
                    key={index}
                    genre={stack.genre}
                    movies={stack.movies}
                  />
                );
              } else {
                return null;
              }
            })}
            <Footer />
          </Route>
          <Route path="/movie">
            <Movie />
          </Route>
          <Route path="/genre">
            <Genre />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
