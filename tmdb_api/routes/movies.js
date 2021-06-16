const Joi = require("joi");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    tmdbID: { type: Number, required: true, minlength: 3, maxlength: 50 },
    title: { type: String, required: true },
    director: String,
    description: { type: String, required: true },
    posterPath: { type: String, required: true },
    backdropPath: { type: String, required: true },
    videoSrc: { type: String, required: true },
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
    releaseDate: Date,
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

// Get single movie
router.get("/title/:title", async (req, res) => {
  const movie = await Movie.findOne({
    title: { $regex: new RegExp(req.params.title, "i") },
  });

  console.log("TITLE");

  if (!movie)
    return res
      .status(400)
      .send(`The movie with name of ${req.params.title} could not be found.`);

  res.send(movie);
});

/* router.get("/tmdbid/", async (req, res) => {
  let test = true;
  if (test)
    return res
      .status(400)
      .send(`No movies with tmdbID of test could be found.`);
  else res.send("Chicken");
}); */

// Get movie by tmdbID
router.get("/tmdbid/:id", async (req, res) => {
  try {
    const movie = await Movie.findOne({
      tmdbID: req.params.id,
    });

    if (!movie) {
      res
        .status(400)
        .send(`No movies with tmdbID of ${req.params.id} could be found.`);
    } else {
      res.status(200).send(movie);
    }
  } catch (err) {
    res.send(500);
  }
});

// Get movies by genre id
router.get("/genre/:id", async (req, res) => {
  const movies = await Movie.find({ genres: req.params.id });

  console.log(`Pulled genre of id ${req.params.id}`);

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
    tmdbID: req.body.tmdbID,
    title: req.body.title,
    director: req.body.director,
    description: req.body.description,
    posterPath: req.body.posterPath,
    backdropPath: req.body.backdropPath,
    videoSrc: req.body.videoSrc,
    genres: req.body.genres,
    releaseDate: req.body.releaseDate,
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
      tmdbID: req.body.tmdbID,
      title: req.body.title,
      director: req.body.director,
      description: req.body.title,
      posterPath: req.body.posterPath,
      backdropPath: req.body.backdropPath,
      videoSrc: req.body.videoSrc,
      genres: req.body.genres,
      releaseDate: req.body.releaseDate,
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
    tmdbID: Joi.number().required(),
    title: Joi.string().min(3).max(50).required(),
    director: Joi.string(),
    description: Joi.string().required(),
    posterPath: Joi.string().required(),
    backdropPath: Joi.string().required(),
    videoSrc: Joi.string().required(),
    genres: Joi.array().required(), // Should do more here, but this is good for now
    releaseDate: Joi.date(),
    runtime: Joi.number().required(),
    connected: Joi.boolean().required(),
  });

  return schema.validate(movie);
}

module.exports = router;
