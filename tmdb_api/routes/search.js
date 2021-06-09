const express = require('express');
const router = express.Router();
const request = require('request');

// Make an environment variable
const API_KEY = "3c0b460139111299f2e29be8ee3986cc";

router.get('/:name', (req, res) => {
    request(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${req.params.name}&page=1&include_adult=true`, (error, response, body) => {
        const data = JSON.parse(body);
        const movie = data.results[2];
        const path = movie.poster_path;
        res.send(`<img src='https://image.tmdb.org/t/p/w500/${path}'></img>`);
    });
});

module.exports = router;