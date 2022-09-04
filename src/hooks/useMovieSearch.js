import { useEffect, useState } from "react";
import axios from "axios";

function useMovieSearch(genre, user, limit, query) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    let cancel;
    axios({
      method: "GET",
      url: `http://${process.env.REACT_APP_IP_ADDRESS}:${process.env.REACT_APP_PORT}/api/movies/all/${genre.id}/${user.id}/${limit}`,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setMovies((prevMovies) => {
          return [...prevMovies, ...res.data];
        });
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, genre]);

  return { loading, error, movies, hasMore };
}

export default useMovieSearch;
