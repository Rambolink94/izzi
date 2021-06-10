import React from "react";
import "./App.css";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieStack from "./components/MovieStack/MovieStack";

class App extends React.Component {
  /* const movies = [
    {title: "The Mummy"},
    {title: "The Lord of the Rings: Fellowship of the Ring"},
    {title: "Avengers: Infinity War"},
    {title: "Interstellar"},
    {title: "The Big Lebowski"},
    {title: "The Fountain"},
    {title: "The Mummy"},
    {title: "The Lord of the Rings: Fellowship of the Ring"},
    {title: "Avengers: Infinity War"},
    {title: "Interstellar"},
    {title: "The Big Lebowski"},
    {title: "The Fountain"},
  ] */

  state = {
    movies: [],
  };

  componentDidMount() {
    const url = "http://localhost:5000/api/movies";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ movies: data });
      });
  }

  render() {
    return (
      <div className="App">
        <MovieStack genre="Action">
          {this.state.movies.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                title={movie.title}
                poster={movie.poster}
              />
            );
          })}
        </MovieStack>
        <MovieStack genre="Aventure">
          {this.state.movies.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                title={movie.title}
                poster={movie.poster}
              />
            );
          })}
        </MovieStack>
        <MovieStack genre="Comedy">
          {this.state.movies.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                title={movie.title}
                poster={movie.poster}
              />
            );
          })}
        </MovieStack>
        <MovieStack genre="Fantasy">
          {this.state.movies.map((movie, index) => {
            return (
              <MovieCard
                key={index}
                title={movie.title}
                poster={movie.poster}
              />
            );
          })}
        </MovieStack>
      </div>
    );
  }
}

export default App;
