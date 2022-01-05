const knex = require("../../database");
const { genreService } = require("../services");

// Get all genres
exports.getAllGenres = async (req, res) => {
  knex
    .select("*")
    .from("genres")
    .then((genres) => res.json(genres))
    .catch((error) =>
      res.json({ message: `There was an error retrieving genres: ${error}` })
    );
};

// Get single genre by name
exports.getSingleByName = async (req, res) => {
  knex("genres")
    .select("*")
    .where("name", req.params.name)
    .then((genre) => res.json(genre))
    .catch((error) =>
      res.json({ message: `There was an error retrieving genre: ${error}` })
    );
};

// Create a genre
exports.createGenre = async (req, res) => {
  knex("genres")
    .insert({
      name: req.body.name,
    })
    .then(() => {
      res.json({ id });
    })
    .catch((error) => {
      res.json({
        message: `There was an error creating genre ${req.body.name}: ${error}`,
      });
    });
};

// Create a genre connection
exports.createGenreConnection = async (req, res) => {
  console.log("Making connection", req.body);
  knex("movie_genres")
    .insert({
      movie_id: req.body.movieId,
      genre_id: req.body.genreId,
    })
    .then(() => {
      res.json({ message: `Genre connection created.` });
    })
    .catch((error) => {
      res.json({
        message: `There was an error creating genre connection: ${error}`,
      });
    });
};
