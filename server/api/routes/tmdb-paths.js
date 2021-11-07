const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Make an environment variable
const API_KEY = "3c0b460139111299f2e29be8ee3986cc";

// Get single movie
router.get("/:id", (req, res) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${API_KEY}&language=en-US`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      res.send(data);
    });
});

module.exports = router;
