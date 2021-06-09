var express = require('express');
var app = express();
var request = require('request');

// Make an environment variable
const API_KEY = "3c0b460139111299f2e29be8ee3986cc";

app.get('/movies', (req, res, next) => {
    request(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=the%20mummy&page=1&include_adult=true`, (error, rensponse, body) => {
        res.send(body);
        console.log(res);
    }).pipe(res);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));