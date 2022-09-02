const knex = require("../../database");
const tableNames = require("../../utility/tableNames");
const { movieService } = require("../services");
const fs = require("fs");

// Get all movies
const getAllMovies = async (req, res) => {
  console.log(req.params);
  knex
    .select(`${tableNames.movies}.*`, "prog.time_elapsed")
    .from("movies")
    .leftJoin(
      knex
        .select("movie_id", "time_elapsed")
        .from(`${tableNames.userMovieProgresses}`)
        .where("user_id", req.params.userId)
        .as("prog"),
      "prog.movie_id",
      `${tableNames.movies}.id`
    )
    .then((movies) => res.json(movies))
    .catch((error) =>
      res.json({ message: `There was an error retrieving movies: ${error}` })
    );
};

const getAll = async (req, res) => {
  const limit = req.params.limit;
  const result = await movieService.getAllMoviesByGenreId(
    req.params.genreId,
    req.params.userId,
    limit
  );
  console.log(result);
  res.send(result);
};

const getSingleMovie = async (req, res) => {
  knex("movies")
    .select("*")
    .where("tmdb_id", req.params.tmdbId)
    .then((movie) => res.json(movie))
    .catch((error) =>
      res.json({ message: `There was an error retrieving movie: ${error}` })
    );
};

const getMoviesByQuery = async (req, res) => {
  knex("movies")
    .select("*")
    .where("title", "like", `%${req.params.query}%`)
    .then((movies) => res.json(movies))
    .catch((error) =>
      res.json({ message: `There was an error retrieving movies: ${error}` })
    );
};

// Create a movie
const createMovie = async (req, res) => {
  knex("movies")
    .insert({
      tmdb_id: req.body.tmdbId,
      title: req.body.title,
      description: req.body.description,
      poster_path: req.body.posterPath,
      backdrop_path: req.body.backdropPath,
      video_src: req.body.videoSrc,
      release_date: req.body.releaseDate,
      runtime: req.body.runtime,
      connected: req.body.connected,
    })
    .then((row) => {
      console.log("row", row);
      res.json({ id: row[0].id });
    })
    .catch((error) => {
      res.json({
        message: `There was an error creating movie ${req.body.title}: ${error}`,
      });
    });
};

// Update a movie
const updateMovie = async (req, res) => {
  knex("movies")
    .update({
      tmdb_id: req.body.tmdbId,
      title: req.body.title,
      description: req.body.description,
      poster_path: req.body.posterPath,
      backdrop_path: req.body.backdropPath,
      video_src: req.body.videoSrc,
      release_date: req.body.releaseDate,
      runtime: req.body.runtime,
      connected: req.body.connected,
    })
    .where("id", req.params.movieId)
    .then((row) => {
      console.log("row", row);
      res.json({ id: req.params.movieId });
    })
    .catch((error) => {
      res.json({
        message: `There was an error creating movie ${req.body.title}: ${error}`,
      });
    });
};

// Stream Movie
const streamMovie = async (req, res) => {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("No range header found.");
  }

  const basePath = "G:\\Knight's Movies/";
  const { src } = req.params;
  const fullPath = basePath + src;

  const videoSize = fs.statSync(fullPath).size;
  const CHUNK_SIZE = 10 ** 6; // 1MB chunk size
  const start = Number(range.replace(/\D/g, "")); // Removes all non-digit characters
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": `video/${extractExtension(src)}`,
  };

  res.writeHead(206, headers); // 206 means partial content

  const videoStream = fs.createReadStream(fullPath, { start, end });

  videoStream.pipe(res);
};

const extractExtension = (src) => {
  const extension = src.split(".")[1];
  return extension;
};

module.exports = {
  getAllMovies,
  getAll,
  getSingleMovie,
  getMoviesByQuery,
  createMovie,
  updateMovie,
  streamMovie,
};
