import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
//import MovieStack from "../../MovieStack/MovieStack";
import MovieStack from "../../../componentsV2/MovieStack";
import "./Home.css";

function Home(props) {
  const [stacks, setStacks] = useState([]);

  useEffect(() => {
    async function setupStacks() {
      const stacks = await getMovieStacks();
      setStacks(stacks);
    }

    setupStacks();
  }, []);

  const location = useLocation();

  const user = location.state
    ? location.state.user
    : JSON.parse(localStorage.getItem("user"));

  const getMovieStacks = async () => {
    const limit = 30;
    const stacks = [];
    // get genres
    const response = await axios({
      method: "get",
      url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/genres/all`,
    });
    const genres = response.data;

    await Promise.all(
      genres.map(async (genre) => {
        const response = await axios({
          method: "get",
          url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/movies/all/${genre.id}/${user.id}/${limit}`,
        });
        const movieData = response.data;
        stacks.push({ genre: genre, movieData: movieData });
      })
    );
    return stacks;
  };

  return (
    <div>
      <Header />
      <div className="stack-body">
        {stacks.map((stack, index) => {
          if (stack.movieData.length > 0) {
            return (
              <MovieStack
                key={index}
                genre={stack.genre}
                movieData={stack.movieData}
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
