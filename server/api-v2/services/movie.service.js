const knex = require("../../database");

const createOrUpdateMovie = async (movie) => {
  // check if movie already exists
  let id = await getMovieByTmdbId(movie.tmdbMatch.id);

  const newMovie = {
    tmdb_id: movie.tmdbDetails.id,
    title: movie.tmdbDetails.original_title,
    description: movie.tmdbDetails.overview,
    poster_path: movie.tmdbDetails.poster_path,
    backdrop_path: movie.tmdbDetails.backdrop_path,
    video_src: movie.name,
    release_date: movie.tmdbDetails.release_date,
    runtime: movie.tmdbDetails.runtime,
    connected: true,
  };

  if (id) {
    // Movie already exists, update
    await knex("movies").update(newMovie).where("id", id);
  } else {
    // Movie doesn't exist, create
    await knex("movies")
      .insert(newMovie)
      .catch((error) => console.log(movie.cleanName, error));
    id = await getMovieByTmdbId(movie.tmdbMatch.id);
  }
  return id;
};

const getMovieByTmdbId = async (tmdbId) => {
  const results = await knex("movies").select("id").where("tmdb_id", tmdbId);

  return results[0]?.id;
};

const getAllMoviesByGenreId = async (genreId, userId) => {
  const query = knex
    .select(
      "movies.id",
      "movies.title",
      "movies.description",
      "movies.poster_path",
      "movies.backdrop_path",
      "movies.video_src",
      "movies.release_date",
      "movies.runtime",
      "user_movie_progresses.time_elapsed"
    )
    .from("movie_genres")
    .leftJoin("movies", "movie_genres.movie_id", "movies.id")
    .leftJoin("user_movie_progresses", function () {
      this.on("movies.id", "=", "user_movie_progresses.movie_id");
      this.andOnVal("user_movie_progresses.user_id", "=", userId);
    })
    .where("movie_genres.genre_id", genreId)
    .orderByRaw("RANDOM()");
  const results = await query;

  return results;
};

module.exports = {
  createOrUpdateMovie,
  getMovieByTmdbId,
  getAllMoviesByGenreId,
};
