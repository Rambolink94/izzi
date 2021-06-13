const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    tmdb_id: { type: Number, required: true, minlength: 3, maxlength: 50 },
    title: { type: String, required: true },
    director: String,
    description: { type: String, required: true },
    poster_path: { type: String, required: true },
    video_src: { type: String, required: true },
    genres: {
      type: Array,
      validate: {
        validator: function (v) {
          return v && v.length > 0;
        },
        message:
          "A Movie must have at least one genre. Otherwise it will not appear on izzi.",
      },
    },
    release_date: Date,
    runtime: { type: Number, required: true },
    connected: { type: Boolean, required: true },
  })
);

// Get all movies
router.get("/", async (req, res) => {
  // Potentially sort by random for a different experience everytime
  const movies = await Movie.find().sort("title");
  res.send(movies);
});

// Get single movie
router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res
      .status(400)
      .send(`The movie with id of ${req.params.id} could not be found.`);

  res.send(movie);
});

// Get movies by genre id
router.get("/genre/:id", async (req, res) => {
  const movies = await Movie.find({ genres: req.params.id });

  if (!movies)
    return res
      .status(400)
      .send(`No movies with genre of id ${req.params.id} could be found.`);

  res.send(movies);
});

// Create new movie
router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({
    tmdb_id: req.body.tmdb_id,
    title: req.body.title,
    director: req.body.director,
    description: req.body.description,
    poster_path: req.body.poster_path,
    video_src: req.body.video_src,
    genres: req.body.genres,
    release_date: req.body.release_date,
    runtime: req.body.runtime,
    connected: req.body.connected,
  });
  movie = await movie.save();
  res.send(movie);
});

// Update movie
router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      tmdb_id: req.body.tmdb_id,
      title: req.body.title,
      director: req.body.director,
      description: req.body.title,
      poster_path: req.body.poster_path,
      video_src: req.body.video_src,
      genres: req.body.genres,
      release_date: req.body.release_date,
      runtime: req.body.runtime,
      connected: req.body.connected,
    },
    { new: true }
  );

  if (!movie)
    return res
      .status(400)
      .send(`The movie with id of ${req.params.id} could not be found.`);

  res.send(movie);
});

// Delete movie
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndRemove(req.params.id);

  if (!movie)
    return res
      .status(400)
      .send(`The movie with id of ${req.params.id} could not be found.`);

  res.send(movie);
});

// Initial input validation
function validateMovie(movie) {
  const schema = Joi.object({
    tmdb_id: Joi.number().required(),
    title: Joi.string().min(3).max(50).required(),
    director: Joi.string(),
    description: Joi.string().required(),
    poster_path: Joi.string().required(),
    video_src: Joi.string().required(),
    genres: Joi.array().required(), // Should do more here, but this is good for now
    release_date: Joi.date(),
    runtime: Joi.number().required(),
    connected: Joi.boolean().required(),
  });

  return schema.validate(movie);
}

module.exports = router;
