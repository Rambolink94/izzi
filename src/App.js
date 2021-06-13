import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieStack from "./components/MovieStack/MovieStack";

class App extends React.Component {
  movies = [
    { title: "The Mummy" },
    { title: "The Lord of the Rings: Fellowship of the Ring" },
    { title: "Avengers: Infinity War" },
    { title: "Interstellar" },
    { title: "The Big Lebowski" },
    { title: "The Fountain" },
    { title: "The Mummy" },
    { title: "The Lord of the Rings: Fellowship of the Ring" },
    { title: "Avengers: Infinity War" },
    { title: "Interstellar" },
    { title: "The Big Lebowski" },
    { title: "The Fountain" },
  ];

  state = {
    stacks: [],
  };

  async componentDidMount() {
    const stacks = await this.getMovieStacks();
    console.log(stacks);
    console.log(this.movies);
    this.setState({ stacks });
  }

  async getMovieStacks() {
    const stacks = [];
    // get genres
    const res = await fetch("http://localhost:5000/api/genres");
    const genres = await res.json();
    // foreach genre, get movies
    genres.forEach(async (genre) => {
      const id = genre._id;
      const res = await fetch(`http://localhost:5000/api/movies/genre/${id}`);
      const movies = await res.json();
      stacks.push({ id: id, genre: genre.name, movies: movies });
    });
    return stacks;
  }

  render() {
    return (
      <div className="App">
        <Header />
        {this.state.stacks.map((stack, index) => {
          console.log(stack);
          return (
            <MovieStack key={index} genre={stack.genre}>
              {stack.movies.map((movie, index) => {
                return <MovieCard key={index} movie={movie} />;
              })}
            </MovieStack>
          );
        })}
      </div>
    );
  }
}

export default App;
