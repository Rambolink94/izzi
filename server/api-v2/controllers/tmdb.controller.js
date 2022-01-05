const axios = require("axios");
const { tmdbService } = require("../services");

require("dotenv").config();

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const LANGUAGE = "en-US";

// Search TMDB by movie name
const getTMDBMovieByName = async (req, res) => {
  const response = await tmdbService.getTMDBMovieByName(req.params.name);
  res.send(response);
};

// Search TMDB by movie ID
const getTMDBMovieByID = async (req, res) => {
  //console.log(`API: Request movie ID - ${req.params.id}`);
  const response = await tmdbService.getTMDBMovieByID(req.params.id);
  res.send(response);
};

module.exports = {
  getTMDBMovieByName,
  getTMDBMovieByID,
};
