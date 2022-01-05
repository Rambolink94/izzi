const axios = require("axios");
const axiosRetry = require("axios-retry");
const fetch = require("node-fetch");
const http = require("http");

require("dotenv").config();

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const LANGUAGE = "en-US";

// Search TMDB by movie name
const getTMDBMovieByName = async (name) => {
  axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
      console.log(`Retry attempt: ${retryCount} for ${name}.`);
      return retryCount * 2000;
    },
  });

  const response = await axios({
    method: "GET",
    url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=${LANGUAGE}&query=${name}`,
    httpAgent: new http.Agent({ keepAlive: true }),
  }).catch((error) => {
    console.error(error);
  });
  return response.data.results;
};

// Search TMDB by movie ID
const getTMDBMovieByID = async (id) => {
  // console.log(
  //   `API: Request movie ID - ${id} - URL: https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`
  // );
  axiosRetry(axios, {
    retries: 3,
    retryDelay: (retryCount) => {
      console.log(`Retry attempt: ${retryCount} for ${id}.`);
      return retryCount * 2000;
    },
  });

  const response = await axios({
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=${LANGUAGE}`,
    httpAgent: new http.Agent({ keepAlive: true }),
  }).catch((error) => {
    console.error(error);
  });
  return response.data;
};

module.exports = {
  getTMDBMovieByName,
  getTMDBMovieByID,
};
