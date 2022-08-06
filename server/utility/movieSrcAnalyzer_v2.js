const fs = require("fs");
const axios = require("axios");
const { getVideoDurationInSeconds } = require("get-video-duration");
const dotenv = require("dotenv");
const {
  tmdbService,
  genreService,
  collectionService,
  movieService,
} = require("../api-v2/services");

dotenv.config();

const baseDirectory = "G:\\Knight's Movies";

class movieSrcAnalyzer {
  async analyze() {
    console.log("Starting Analyzer... \n");

    const diskMovies = await this.getDiskMovies(baseDirectory);

    let matchedMovies = [];
    let index = 1;
    for (const movie of diskMovies) {
      console.log(`${index + 1}/${diskMovies.length} - ${movie.cleanName}`);
      const tmdbMatch = await this.getTMDBMatch(movie, index);
      this.createMovie(movie);
      matchedMovies.push(tmdbMatch);
      index++;
    }
    console.log("Done with Analysis.");
    return matchedMovies;
  }

  async getDiskMovies(directory) {
    const names = await fs.promises.readdir(directory);
    const movies = names.map((name) => {
      const cleanName = this.cleanName(name);
      console.log(`Processing ${cleanName}`);
      return { name, cleanName };
    });
    return movies;
  }

  cleanName(name) {
    let cleanName = name;

    const partRegex = /part\s([0-9]*)/g;
    const partInfo = cleanName.match(partRegex);

    cleanName = cleanName
      .replace(partRegex, "")
      .replace(/\.[^/.]+$/, "")
      .replace("_", " ")
      .toLowerCase();

    return cleanName;
  }

  // Movie Structure: { name, cleanName }
  async getTMDBMatch(movie, index) {
    const results = await tmdbService.getTMDBMovieByName(movie.cleanName);
    console.log(
      `Length: ${results.length} - Movie: ${movie.cleanName} - Index: ${index}`
    );

    for (const result of results) {
      const movieDetails = await tmdbService.getTMDBMovieByID(result.id);
      if (movieDetails == undefined) return movie;
      // Check if result matches movie runtime
      const seconds = await getVideoDurationInSeconds(
        `${baseDirectory}/${movie.name}`
      );
      movie.runtime = seconds / 60.0; // runtime in minutes
      if (Math.abs(movie.runtime - movieDetails.runtime) < 1) {
        movie.tmdbMatch = result;
        movie.tmdbDetails = movieDetails;
        console.log(
          `${index} - Movie: ${movie.cleanName} - TMDB ID: ${movie.tmdbMatch.id}`
        );
        return movie;
      }
      // Other checks if not found
    }
    // If here, no matches found for movie
    movie.tmdbMatch = null;
    movie.tmdbDetails = null;
    console.log(`${index} - Movie: ${movie.cleanName} not Found.`);
    return movie;
  }

  async createMovie(movie) {
    if (movie.tmdbDetails == null) {
      // Add manual details for movies that were not found.
      console.log(`Movie ${movie.cleanName} has no Details`);
      return;
    }

    // Handle Genres, Collections, and Movie Creation
    const genreIds = await genreService.handleGenres(movie.tmdbDetails.genres);
    const collectionId = await collectionService.handleCollections(
      movie.tmdbDetails.belongs_to_collection
    );
    const movieId = await movieService.createOrUpdateMovie(movie);

    // Handle genre and collection connections
    await genreService.handleGenreConnections(genreIds, movieId);
    await collectionService.handleCollectionConnections(collectionId, movieId);
  }
}

module.exports = movieSrcAnalyzer;
