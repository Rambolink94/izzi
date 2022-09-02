const express = require("express");
const controller = require("../controllers/movie.controller.js");
const router = express.Router();

router.get("/all/:genreId/:userId/:limit?", controller.getAll);
router.get("/all/:userId", controller.getAllMovies);
router.get("/search/:query", controller.getMoviesByQuery);
router.get("/single/:tmdbId", controller.getSingleMovie);
router.get("/stream/:src", controller.streamMovie);
router.post("/create", controller.createMovie);
router.put("/create/:movieId", controller.updateMovie);

module.exports = router;
