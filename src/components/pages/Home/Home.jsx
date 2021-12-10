import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import MovieStack from "../../MovieStack/MovieStack";
import "./Home.css";

function Home(props) {
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    console.log(location.state);
    async function setupStacks() {
      const stacks = await getMovieStacks();
      setStacks(stacks);
    }

    setupStacks();
  }, []);

  const location = useLocation();

  const { user } = location.state
    ? location.state
    : localStorage.getItem("user");

  const getMovieStacks = async () => {
    const stacks = [];
    // get genres
    const res = await fetch(
      `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/genres`
    );
    const genres = await res.json();

    await Promise.all(
      genres.map(async (genre) => {
        const res = await fetch(
          `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/movies/genre/${genre._id}`
        );
        const movies = await res.json();
        stacks.push({ genre: genre, movies: movies });
      })
    );
    return stacks;
  };

  return (
    <div>
      <Header />
      <div className="stack-body">
        {stacks.map((stack, index) => {
          if (stack.movies.length > 0) {
            return (
              <MovieStack
                key={index}
                genre={stack.genre}
                movies={stack.movies}
                user={user}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
