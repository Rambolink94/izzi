const knex = require("../../database");

const handleGenres = async (genreData) => {
  if (!genreData) return null; // No data received

  let ids = [];
  // Search if ids exist
  for (const data of genreData) {
    let id = await getGenreByTmdbId(data.id);

    // If id already exist, push it, otherwise create it
    if (!id) {
      // Get genre information
      await knex("genres").insert({
        tmdb_genre_id: data.id,
        name: data.name,
      });

      id = await getGenreByTmdbId(data.id);
    }
    ids.push(id);
  }

  return ids;
};

const handleGenreConnections = async (genreIds, movieId) => {
  for (const genreId of genreIds) {
    // Check if there already is a connection for this genre and movie
    const id = await getGenreConnection(genreId, movieId);
    if (!id) {
      // If connection doesn't already exist
      await knex("movie_genres").insert({
        movie_id: movieId,
        genre_id: genreId,
      });
    }
  }
};

const getGenreByTmdbId = async (tmdbId) => {
  const results = await knex("genres")
    .select("id")
    .where("tmdb_genre_id", tmdbId);
  return results[0]?.id;
};

const getGenreConnection = async (genreId, movieId) => {
  const results = await knex("movie_genres")
    .select("id")
    .where("movie_id", movieId)
    .andWhere("genre_id", genreId)
    .catch((error) => console.log("Genre Connection", error));

  return results[0]?.id;
};

module.exports = {
  handleGenres,
  handleGenreConnections,
  getGenreByTmdbId,
};
