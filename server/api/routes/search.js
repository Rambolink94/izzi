const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const API_KEY = process.env.TMDB_API_KEY;

router.get("/:name", async (req, res) => {
  try {
    // Make adult search optional
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${req.params.name}`
    );
    const results = await response.json();
    res.send(results);
  } catch (err) {
    console.error(err);
  }
});

router.get("/id/:id", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${API_KEY}&language=en-US`
    );
    const results = await response.json();
    res.send(results);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;

//[x] Arrival:      329865
//[x] Mummy:        564
//[x] Intersellar:  157336
//[x] Infitiy War:  299536
//[x] LOTR FOTR:    120
//[x] Big Lebowski: 115
//[x] Fountain:     1381
