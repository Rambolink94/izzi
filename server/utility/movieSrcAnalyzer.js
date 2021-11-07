const fs = require("fs");
const fsPromises = fs.promises;
const fetch = require("node-fetch");
const { getVideoDurationInSeconds } = require("get-video-duration");
const dotenv = require("dotenv");

dotenv.config();

const baseDirectory = "G:\\Knight's Movies";
const IP_ADDRESS = process.env.IP_ADDRESS;
const PORT = process.env.PORT;

class movieSrcAnalyzer {
  async analyze() {
    console.log("Starting Analyzer... \n");

    const names = await this.getMovieTitles();
    for (const name of names) {
      const { id, path } = await this.getTMDBid(name);
      await this.createMovie(id, path);
    }

    console.log("Done with Analysis.");
  }

  async getMovieTitles() {
    try {
      return fsPromises.readdir(baseDirectory);
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
        `http://${IP_ADDRESS}:${PORT}/api/search/${cleanName}`
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
              `http://${IP_ADDRESS}:${PORT}/api/search/id/${result.id}`
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
    } catch (e) {
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
    const res = await fetch(`http://${IP_ADDRESS}:${PORT}/api/tmdb/${id}`);
    const tmdbMovie = await res.json();

    // Get and return the genre ids
    const genres = await this.handleGenres(tmdbMovie.genres);
    const collectionID = await this.handleCollection(
      tmdbMovie.belongs_to_collection?.id
    );

    // Generate movie structure
    const newMovie = {
      tmdbID: tmdbMovie.id,
      title: tmdbMovie.original_title,
      director: "N/A",
      description: tmdbMovie.overview,
      posterPath: tmdbMovie.poster_path,
      backdropPath: tmdbMovie.backdrop_path,
      videoSrc: path,
      genres: genres,
      collectionID: collectionID,
      releaseDate: tmdbMovie.release_date,
      runtime: tmdbMovie.runtime,
      connected: true,
    };

    console.log("    -- NEW MOVIE: ", newMovie);

    try {
      const res = await fetch(
        `http://${IP_ADDRESS}:${PORT}/api/movies/tmdbid/${newMovie.tmdbID}`
      );
      let existingMovie = null;
      if (res.status !== 400) existingMovie = await res.json();
      if (!existingMovie) {
        // Add movie to database
        const res = await fetch(`http://${IP_ADDRESS}:${PORT}/api/movies`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMovie),
        });
        await res.json();
        console.log(`    -- ${newMovie.title} added to izzi...`);
      } else {
        // Update Movie
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/movies/${existingMovie._id}`,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
          }
        );
        await res.json();
        console.log(`    -- ${newMovie.title} already exists. Updating...`);
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

  async createMovies(ids) {
    console.log("\n[Analyzer]\t Creating / Updating Movies \n");
    for (const index in ids) {
      const id = ids[index].id;
      const path = ids[index].path;

      // Get movie info
      const res = await fetch(`http://${IP_ADDRESS}:${PORT}/api/tmdb/${id}`);
      const tmdbMovie = await res.json();

      // Get and return the genre ids
      const genres = await this.handleGenres(tmdbMovie.genres);
      const collectionID = await this.handleCollection(
        tmdbMovie.belongs_to_collection?.id
      );

      // Generate movie structure
      const newMovie = {
        tmdbID: tmdbMovie.id,
        title: tmdbMovie.original_title,
        director: "N/A",
        description: tmdbMovie.overview,
        posterPath: tmdbMovie.poster_path,
        backdropPath: tmdbMovie.backdrop_path,
        videoSrc: path,
        genres: genres,
        collectionID: collectionID,
        releaseDate: tmdbMovie.release_date,
        runtime: tmdbMovie.runtime,
        connected: true,
      };

      console.log("---------- NEW MOVIE: ", newMovie);

      try {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/movies/tmdbid/${newMovie.tmdbID}`
        );
        let existingMovie = null;
        if (res.status !== 400) existingMovie = await res.json();
        if (!existingMovie) {
          // Add movie to database
          const res = await fetch(`http://${IP_ADDRESS}:${PORT}/api/movies`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
          });
          await res.json();
          console.log(`---------- ${newMovie.title} added to izzi...`);
        } else {
          // Update Movie
          const res = await fetch(
            `http://${IP_ADDRESS}:${PORT}/api/movies/${existingMovie._id}`,
            {
              method: "PUT",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newMovie),
            }
          );
          await res.json();
          console.log(
            `---------- ${newMovie.title} already exists. Updating...`
          );
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  async handleGenres(genres) {
    console.log("    -- Handling Genres");
    const genreIds = [];
    for (const key in genres) {
      const genre = genres[key];
      // Check if genre already exists
      try {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/genres/${genre.name.toLowerCase()}`
        );
        let existingGenre = null;
        if (res.status !== 400) existingGenre = await res.json();
        if (!existingGenre) {
          // Create new
          const res = await fetch(`http://${IP_ADDRESS}:${PORT}/api/genres`, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: genre.name }),
          });
          const content = await res.json();
          genreIds.push(content._id);
          console.log("      -- NEW: ", content);
        } else {
          genreIds.push(existingGenre._id);
          console.log("      -- OLD: ", existingGenre);
        }
      } catch (err) {
        console.error(err);
      }
    }

    if (genreIds.length <= 0) genreIds.push("6184be19906333cd34c12c4d"); // Insert the uncategorized genre if none are found.

    return genreIds;
  }

  async handleCollection(collectionID) {
    try {
      console.log("    -- Handling Collections");
      if (collectionID) {
        const res = await fetch(
          `http://${IP_ADDRESS}:${PORT}/api/movies/collections`,
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ collectionID }),
          }
        );
        await res.json();
        console.log(`      -- Found Collection ID: ${collectionID}`);
        return collectionID;
      } else {
        console.log(`      -- No Collection found`);
        return null;
      }
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = movieSrcAnalyzer;
