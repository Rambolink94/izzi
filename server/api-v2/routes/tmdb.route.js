const express = require("express");
const controller = require("../controllers/tmdb.controller.js");
const router = express.Router();

router.get("/search-name/:name", controller.getTMDBMovieByName);
router.get("/search-id/:id", controller.getTMDBMovieByID);

module.exports = router;
