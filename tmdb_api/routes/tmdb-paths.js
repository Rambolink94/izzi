const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// Make an environment variable
const API_KEY = "3c0b460139111299f2e29be8ee3986cc";

router.get("/", (req, res) => {
  const movies = [
    {
      title: "The Mummy",
      poster:
        "https://m.media-amazon.com/images/M/MV5BOTJiYjBhZDgtMjhiOC00MTIzLThlNGMtMmI1NjIwM2M3YTI5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1008_.jpg",
    },
    {
      title: "The Lord of the Rings: Fellowship of the Ring",
      poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY720_.jpg",
    },
    {
      title: "Arival",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTExMzU0ODcxNDheQTJeQWpwZ15BbWU4MDE1OTI4MzAy._V1_FMjpg_UY749_.jpg",
    },
    {
      title: "Avengers: Infinity War",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_FMjpg_UY720_.jpg",
    },
    {
      title: "Interstellar",
      poster:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UY720_.jpg",
    },
    {
      title: "The Big Lebowski",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_FMjpg_UX932_.jpg",
    },
    {
      title: "The Fountain",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTU5OTczMTcxMV5BMl5BanBnXkFtZTcwNDg3MTEzMw@@._V1_FMjpg_UY720_.jpg",
    },
    {
      title: "The Mummy",
      poster:
        "https://m.media-amazon.com/images/M/MV5BOTJiYjBhZDgtMjhiOC00MTIzLThlNGMtMmI1NjIwM2M3YTI5XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_FMjpg_UX1008_.jpg",
    },
    {
      title: "The Lord of the Rings: Fellowship of the Ring",
      poster:
        "https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_FMjpg_UY720_.jpg",
    },
    {
      title: "Avengers: Infinity War",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_FMjpg_UY720_.jpg",
    },
    {
      title: "Interstellar",
      poster:
        "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_FMjpg_UY720_.jpg",
    },
    {
      title: "The Big Lebowski",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTQ0NjUzMDMyOF5BMl5BanBnXkFtZTgwODA1OTU0MDE@._V1_FMjpg_UX932_.jpg",
    },
    {
      title: "The Fountain",
      poster:
        "https://m.media-amazon.com/images/M/MV5BMTU5OTczMTcxMV5BMl5BanBnXkFtZTcwNDg3MTEzMw@@._V1_FMjpg_UY720_.jpg",
    },
  ];
  res.send(movies);
});

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
