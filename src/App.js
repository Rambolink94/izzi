import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MovieStack from "./components/MovieStack/MovieStack";
import Movie from "./components/pages/Movie/Movie";

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
        const id = genre._id;
        const res = await fetch(
          `http://10.0.0.158:5000/api/movies/genre/${id}`
        );
        const movies = await res.json();
        stacks.push({ id: id, genre: genre.name, movies: movies });
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
              console.log(stack);
              return (
                <MovieStack
                  key={index}
                  genre={stack.genre}
                  movies={stack.movies}
                />
              );
            })}
            <Footer />
          </Route>
          <Route path="/movie">
            <Movie />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
