var express = require('express');
var router = express.Router();
var request = require('request');

const API_KEY = "3c0b460139111299f2e29be8ee3986cc";

router.get('/movies', function(req, res, next) {
    request("https://api.themoviedb.org/3/movie/550?api_key=3c0b460139111299f2e29be8ee3986cc", function(error, rensponse, body){
        res.send(body);
        console.log(res);
    }).pipe(res);
    
});

module.exports = router;