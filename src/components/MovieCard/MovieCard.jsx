import { useHistory } from "react-router-dom";
import "./MovieCard.css";

function MovieCard(props) {
  const { posterPath, title } = props.movie;

  const baseUrl = "https://image.tmdb.org/t/p/";
  const sizeUrl = "w500/";

  const history = useHistory();
  const changeRoute = () => {
    console.log(history);
    history.push("/movie");
  };

  console.log(props.movie);
  // Sizing of this component should be dynamic based on the size of the screen
  return (
    <div className="movie-card-wrapper">
      <div className="movie-card">
        <img
          className="movie-card-back"
          src={baseUrl + sizeUrl + posterPath}
          alt={title}
        />
        <div className="card-info">
          <h5 className="movie-card-title">{title}</h5>
          <div className="play-button">
            {props.children}
            <img
              src={process.env.PUBLIC_URL + "./icons/play-button.png"}
              alt="Play Button"
              onClick={() => history.push("/movie")}
            />
          </div>
          {/* Need to add a handler for getting the actual genre name. */}
          {/* <ul className="genre-list">
              {console.log(genres)}
              {genres.map((genre, index) => {
                return <li key={index}>{genre}</li>;
              })}
            </ul> */}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
