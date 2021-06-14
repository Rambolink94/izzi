import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MovieCard from "./components/MovieCard/MovieCard";
import MovieStack from "./components/MovieStack/MovieStack";

class App extends React.Component {
  state = {
    stacks: [],
  };

  async componentDidMount() {
    const stacks = await this.getMovieStacks();
    this.setState({ stacks });
  }

  async getMovieStacks() {
    const stacks = [];
    // get genres
    const res = await fetch("http://localhost:5000/api/genres");
    const genres = await res.json();

    await Promise.all(
      genres.map(async (genre) => {
        const id = genre._id;
        const res = await fetch(`http://localhost:5000/api/movies/genre/${id}`);
        const movies = await res.json();
        stacks.push({ id: id, genre: genre.name, movies: movies });
      })
    );
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
        <Footer />
      </div>
    );
  }
}

export default App;
