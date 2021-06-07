import './App.css';
import MovieCard from './components/MovieCard/MovieCard';
import MovieStack from './components/MovieStack/MovieStack';

function App() {
  return (
    <div className="App">
      <MovieStack genre={"Rather Lengthy Genre Name"}>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BOTJiYjBhZDgtMjhiOC00MTIzLThlNGMtMmI1NjIwM2M3YTI5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1008_.jpg"} title={"mummy"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY720_.jpg"} title={"Lord of the Rings: Fellowship of the Ring"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_FMjpg_UY720_.jpg"} title={"Avengers: Infinity War"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UY720_.jpg"} title={"interstellar"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_FMjpg_UX932_.jpg"} title={"big-lebowski"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BMTU5OTczMTcxMV5BMl5BanBnXkFtZTcwNDg3MTEzMw@@._V1_FMjpg_UY720_.jpg"} title={"the-fountain"}/>
      </MovieStack>
      <MovieStack genre={"Genre"}>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY720_.jpg"} title={"arrival"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BOTJiYjBhZDgtMjhiOC00MTIzLThlNGMtMmI1NjIwM2M3YTI5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1008_.jpg"} title={"arrival"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_FMjpg_UY749_.jpg"} title={"arrival"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UY720_.jpg"} title={"interstellar"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_FMjpg_UX932_.jpg"} title={"big-lebowski"}/>
        <MovieCard backImage={"https://m.media-amazon.com/images/M/MV5BMTU5OTczMTcxMV5BMl5BanBnXkFtZTcwNDg3MTEzMw@@._V1_FMjpg_UY720_.jpg"} title={"the-fountain"}/>
      </MovieStack>
    </div>
  );
}

export default App;
