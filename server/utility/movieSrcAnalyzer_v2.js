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
const IP_ADDRESS = process.env.REACT_APP_IP_ADDRESS;
const PORT = process.env.REACT_APP_PORT;

/*
class movieSrcAnalyzer {
  async analyze() {
    console.log("Starting Analyzer... \n");

    let count = 0;
    const names = await this.getMovieTitles();
    for (const name of names) {
      if (count < 1) {
        const { id, path } = await this.getTMDBid(name);
        await this.createMovie(id, path);
        count++;
      }
    }

    console.log("Done with Analysis.");
  }

  async getMovieTitles() {
    try {
      return fs.promises.readdir(baseDirectory);
    } catch (err) {
      console.error(
        `Directory ${baseDirectory} does not exist on your system.`
      );
    }
  }

  async getTMDBid(name) {
    const originalName = name;
    let cleanName = name;

    const partRegex = /part\s([0-9]*)/g;
    const partInfo = cleanName.match(partRegex);

    cleanName = cleanName.replace(partRegex, "");
    cleanName = cleanName.replace(/\.[^/.]+$/, "");
    cleanName = cleanName.replace("_", " ");
    cleanName = cleanName.toLowerCase();

    try {
      const res = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/tmdb/search-name/${cleanName}`
      );
      const movies = await res.json();
      if (movies.results[0] !== undefined) {
        // If at least one result was found
        console.log("\n ID: ", movies.results[0].id, "\t\tName: ", cleanName);
        if (!(movies.results.length > 1)) {
          // If there is only on result, it's likely correct
          console.log(`-- Accepted (${movies.results[0].id})`);
          return { id: movies.results[0].id, path: originalName };
        } else {
          // More than one result was found, must narrow it down.
          for (const key in movies.results) {
            const result = movies.results[key];
            // Result has same exact name as requested movie name. Potentially correct.
            // Get more details on the movie
            const res = await fetch(
              `http://${IP_ADDRESS}:${PORT}/api/tmdb/search-id/${result.id}`
            );
            const movie = await res.json();
            const duration =
              (await getVideoDurationInSeconds(
                baseDirectory + "/" + originalName
              )) / 60;
            if (duration > movie.runtime - 1 && duration < movie.runtime + 1) {
              console.log(`-- Movie ${movie.title} probably is correct.`);
              console.log(`-- Accepted (${movies.results[0].id})`);
              return { id: movies.results[0].id, path: originalName };
            }

            if (
              result.title.includes(cleanName) ||
              result.original_title.includes(cleanName)
            ) {
              // Result includes part of name. Must look for more.
              console.log(
                "--",
                "LOW\t",
                "RESULT: ",
                result.title,
                " -- MY MOVIE: ",
                cleanName
              );
              return { id: null, path: originalName };
            }
          }
          return { id: null, path: originalName };
        }
      } else {
        return { id: null, path: originalName };
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getTMDBids(names, isTest = false, testCount = 10) {
    console.log("\n[Analyzer]\t Searching for Movies \n");

    // Runs a bit slow. Likely can increase its speed
    let cleanNames = names.map((name) => {
      let originalName = name;

      const partRegex = /part\s([0-9]*)/g;
      const partInfo = name.match(partRegex);

      name = name.replace(partRegex, "");
      name = name.replace(/\.[^/.]+$/, "");
      name = name.replace("_", " ");
      name = name.toLowerCase();
      return { name, originalName };
    });

    try {
      const ids = [];
      const missing = [];
      for (const index in cleanNames) {
        const name = cleanNames[index].name;
        const originalName = cleanNames[index].originalName;
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/search/${name}`
        );
        const movies = await res.json();
        if (movies.results[0] !== undefined) {
          // If at least one result was found
          console.log(
            "---------- ID: ",
            movies.results[0].id,
            "\t\tName: ",
            name
          );
          if (!(movies.results.length > 1)) {
            // If there is only on result, it's likely correct
            console.log(`---------- Accepted (${movies.results[0].id})`);
            ids.push({ id: movies.results[0].id, path: originalName });
          } else {
            // More than one result was found, must narrow it down.
            for (const key in movies.results) {
              const result = movies.results[key];
              // Result has same exact name as requested movie name. Potentially correct.
              // Get more details on the movie
              const res = await fetch(
                `http://${IP_ADDRESS}:${PORT}/api/search/id/${result.id}`
              );
              const movie = await res.json();
              const duration =
                (await getVideoDurationInSeconds(
                  baseDirectory + "/" + originalName
                )) / 60;
              if (
                duration > movie.runtime - 1 &&
                duration < movie.runtime + 1
              ) {
                console.log(
                  `---------- Movie ${movie.title} probably is correct.`
                );
                console.log(`---------- Accepted (${movies.results[0].id})`);
                ids.push({ id: movies.results[0].id, path: originalName });
                break;
              }

              if (
                result.title.includes(name) ||
                result.original_title.includes(name)
              ) {
                // Result includes part of name. Must look for more.
                console.log(
                  "----------",
                  "LOW\t",
                  "RESULT: ",
                  result.title,
                  " -- MY MOVIE: ",
                  name
                );
                ids.push({ id: null, path: originalName });
              }
            }
          }
        } else {
          ids.push({ id: null, path: originalName });
          missing.push(name);
        }
        if (isTest && testCount <= 0) break;
        testCount--;
      }
      console.log("[Analyzer]\t FOUND: ", ids);
      console.log("[Analyzer]\t MISSING: ", missing);
      return ids;
    } catch (err) {
      console.error(err);
    }
  }

  async createMovie(id, path) {
    if (id == null) {
      console.log(`Missing ID for ${path}`);
      return;
    }

    console.log(`  -- Creating / Updating Movie ID: ${id}`);

    // Get movie info
    const res = await fetch(
      `http://${IP_ADDRESS}:${PORT}/api/tmdb/search-id/${id}`
    );
    const tmdbMovie = await res.json();

    // Generate movie structure
    const newMovie = {
      tmdbId: tmdbMovie.id,
      title: tmdbMovie.original_title,
      description: tmdbMovie.overview,
      posterPath: tmdbMovie.poster_path,
      backdropPath: tmdbMovie.backdrop_path,
      videoSrc: path,
      releaseDate: tmdbMovie.release_date,
      runtime: tmdbMovie.runtime,
      connected: true,
    };

    console.log("    -- NEW MOVIE: ", newMovie);

    let movieId = null;
    try {
      const res = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/movies/single/${newMovie.tmdbId}`
      );
      let existingMovie = null;
      if (res.status !== 400) existingMovie = await res.json();
      if (!existingMovie || existingMovie.length <= 0) {
        // Add movie to database
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/movies/create`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
          }
        );
        const { id } = await res.json();
        console.log(id);
        movieId = id;
        console.log(`    -- ${newMovie.title} added to izzi...`);
      } else {
        // Update Movie
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/movies/create/${existingMovie[0].id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
          }
        );
        const { id } = await res.json();
        movieId = id;
        console.log(`    -- ${newMovie.title} already exists. Updating...`);
      }

      // Get and return the genre ids
      await this.handleGenres(movieId, tmdbMovie.genres);
      await this.handleCollection(movieId, tmdbMovie.belongs_to_collection?.id);
    } catch (err) {
      console.error(err);
    }
  }

  async handleGenres(movieId, genres) {
    console.log("    -- Handling Genres");
    console.log(genres);
    const genreIds = [];
    for (const key in genres) {
      const genre = genres[key];
      // Check if genre already exists
      try {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/genres/single/${genre.name.toLowerCase()}`
        );
        let existingGenre = null;
        if (res.status !== 400) existingGenre = await res.json();
        console.log(existingGenre);
        if (!existingGenre || existingGenre.length <= 0) {
          // Create new
          const res = await fetch(
            `http://${IP_ADDRESS}:${PORT}/api/genres/create`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: genre.name.toLowerCase() }),
            }
          );
          const content = await res.json();
          // create connection
          const connectionRes = await fetch(
            `http://${IP_ADDRESS}:${PORT}/api/genres/connect`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ movieId: movieId, genreId: content.id }),
            }
          );
          genreIds.push(content.id);
          console.log("      -- NEW: ", content);
        } else {
          // create connection
          console.log("body", {
            movieId: movieId,
            genreId: existingGenre[0].id,
          });
          const res = await fetch(
            `http://${IP_ADDRESS}:${PORT}/api/genres/connect`,
            {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                movieId: movieId,
                genreId: existingGenre[0].id,
              }),
            }
          );
          console.log(await res.json());
          genreIds.push(existingGenre.id);

          console.log("      -- OLD: ", existingGenre);
        }
      } catch (err) {
        console.error(err);
      }
    }

    return genreIds;
  }

  async handleCollection(movieID, collectionID) {
    try {
      console.log("    -- Handling Collections");
      if (collectionID) {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/collections/${collectionID}`
        );
        let existingCollection = null;
        if (res.status !== 400) existingCollection = await res.json();
        if (!existingCollection) {
          // Get collection information
          const res = await fetch(
            `http://${IP_ADDRESS}:${PORT}/api/collections/create`
          );
          const { name } = res.json();

          await fetch(`http://${IP_ADDRESS}:${PORT}/api/collections/create`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tmdb_collection_id: collectionID,
              name: name,
            }),
          });

          // Create Connection
          await fetch(`http://${IP_ADDRESS}:${PORT}/api/collections/connect`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              movie_id: movieID,
              collection_id: collectionID,
            }),
          });
          console.log(`      -- Found Collection ID: ${collectionID}`);
          return collectionID;
        }
      } else {
        console.log(`      -- No Collection found`);
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  }
}
*/

/* FINISH THIS METHOD */
/*
class movieSrcAnalyzer {
  async analyze() {
    console.log("Starting Analyzer... \n");

    fs.promises
      .readdir(baseDirectory)
      .then((names) => {
        const fileCount = names.length;
        let currentFileNum = 1;
        for (const name of names) {
          this.getTMDBid(name).then((data) => {
            console.log(`${currentFileNum} / ${fileCount}: `, data);
            currentFileNum++;
          });
          //await this.createMovie(id, path);
        }
      })
      .then(() => "Done with Analysis.")
      .catch((error) => console.error(error));

    //console.log("Done with Analysis.");
  }

  async getTMDBid(name) {
    const originalName = name;
    let cleanName = name;

    const partRegex = /part\s([0-9]*)/g;
    const partInfo = cleanName.match(partRegex);

    cleanName = cleanName.replace(partRegex, "");
    cleanName = cleanName.replace(/\.[^/.]+$/, "");
    cleanName = cleanName.replace("_", " ");
    cleanName = cleanName.toLowerCase();

    return new Promise((resolve, reject) => {
      axios
        .get(`http://${IP_ADDRESS}:${PORT}/api/tmdb/search-name/${cleanName}`)
        .then((response) => {
          const movies = response.data.results;

          // If at least one result was found
          if (movies && movies[0] !== undefined) {
            // If there is only one result, it's likely correct
            if (!(movies.length > 1)) {
              return { id: movies[0].id, path: originalName };
            } else {
              // More than one result was found, we must narrow it down.
              for (const key in movies) {
                console.log(`\tProccessing movie for ${cleanName}.`);
                const result = movies[key];

                return new Promise((resolve, reject) => {
                  axios
                    .get(
                      `http://${IP_ADDRESS}:${PORT}/api/tmdb/search-id/${result.id}`
                    )
                    .then((response) => {
                      const movie = response.data;

                      getVideoDurationInSeconds(
                        `${baseDirectory}/${originalName}`
                      ).then((duration) => {
                        const durationInMinutes = duration / 60;

                        if (
                          durationInMinutes > movie.runtime - 1 &&
                          durationInMinutes < movie.runtime + 1
                        ) {
                          resolve({
                            id: result.id,
                            path: originalName,
                          });
                        }
                      });
                    })
                    .catch((error) => console.error(error));

                  if (
                    result.title.includes(cleanName) ||
                    result.original_title.includes(cleanName)
                  ) {
                    // Get more data here.
                  }
                });
              }
            }
          }
          return { id: null, path: originalName };
        })
        .then((movieData) => {
          resolve(movieData);
        })
        .catch((error) => console.error(error));
    }).then((data) => {
      console.log(data);
      return data;
    });
  }
}
*/

class movieSrcAnalyzer {
  async analyze() {
    console.log("Starting Analyzer... \n");

    const diskMovies = await this.getDiskMovies(baseDirectory);
    // const promises = diskMovies.map((movie, index) => {
    //   //console.log(`${index + 1}/${diskMovies.length} - ${movie.cleanName}`);
    //   const tmdbMatch = this.getTMDBMatch(movie, index);
    //   console.log("TMDB MATCH: ", tmdbMatch);
    //   return tmdbMatch;
    // });
    // const matchedMovies = await Promise.all(promises).catch((error) => {
    //   console.log(`Promises contains rejection ${error}`);
    // });
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
    if (movie.tmdbDetails == null)
      console.log(`Movie ${movie.cleanName} has no Details`);
    if (movie.tmdbDetails == null) return;

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
