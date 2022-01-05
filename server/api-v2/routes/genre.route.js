const express = require("express");
const controller = require("../controllers/genre.controller.js");
const router = express.Router();

router.get("/all", controller.getAllGenres);
router.get("/single/:name", controller.getSingleByName);
router.post("/create", controller.createGenre);
router.post("/connect", controller.createGenreConnection);

module.exports = router;
