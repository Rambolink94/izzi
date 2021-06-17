const fs = require("fs");
const fsPromises = fs.promises;
const fetch = require("node-fetch");
const { getVideoDurationInSeconds } = require("get-video-duration");

const baseDirectory = "D:\\Knight's Movies";

class movieSrcAnalyzer {
  getMovieTitles() {
    try {
      return fsPromises.readdir(baseDirectory);
    } catch (err) {
      console.error(err);
    }
  }

  async getTMDBids(names, isTest = false, testCount = 10) {
    // Runs a bit slow. Likely can increase its speed
    let cleanNames = names.map((name) => {
      let originalName = name;
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
        const res = await fetch(`http://10.0.0.158:5000/api/search/${name}`);
        const movies = await res.json();
        if (movies.results[0] !== undefined) {
          // If at least one result was found
          console.log("ID: ", movies.results[0].id, "\t\tName: ", name);
          if (!(movies.results.length > 1)) {
            // If there is only on result, it's likely correct
            console.log(`-----: Accepted (${movies.results[0].id}) :-----`);
            ids.push({ id: movies.results[0].id, path: originalName });
          } else {
            // More than one result was found, must narrow it down.
            for (const key in movies.results) {
              const result = movies.results[key];
              if (
                result.title.toLowerCase() === name ||
                result.original_title.toLowerCase() === name
              ) {
                // Result has same exact name as requested movie name. Potentially correct.
                // Get more details on the movie
                const res = await fetch(
                  `http://10.0.0.158:5000/api/search/${result.id}`
                );
                const movie = await res.json();
                console.log("MOVIE TO USE: ", movie);
                const duration =
                  getVideoDurationInSeconds(
                    baseDirectory + "/" + originalName
                  ) / 60;
                if (
                  duration > movie.runtime - 1 &&
                  duration < movie.runtime + 1
                ) {
                  console.log(`Movie ${movie.title} probably is correct.`);
                }
              } else if (
                result.title.includes(name) ||
                result.original_title.includes(name)
              ) {
                // Result includes part of name. Must look for more.
                console.log(
                  "LOW\t",
                  "RESULT: ",
                  result.title,
                  " -- MY MOVIE: ",
                  name
                );
              }
            }
          }
        } else {
          missing.push(name);
        }
        if (isTest && testCount <= 0) break;
        testCount--;
      }
      console.log(ids);
      console.log(missing);
      return ids;
    } catch (err) {
      console.error(err);
    }
  }

  async createMovies(ids) {
    for (const index in ids) {
      const id = ids[index].id;
      const path = ids[index].path;

      // Get movie info
      const res = await fetch(`http://10.0.0.158:5000/api/tmdb/${id}`);
      const tmdbMovie = await res.json();

      // Get and return the genre ids
      const genres = await this.handleGenres(tmdbMovie.genres);

      // Generate movie structure
      const newMovie = {
        tmdbID: tmdbMovie.id,
        title: tmdbMovie.original_title,
        director: "N/A", // Maybe I should remove this field?
        description: tmdbMovie.overview,
        posterPath: tmdbMovie.poster_path,
        backdropPath: tmdbMovie.backdrop_path,
        videoSrc: path, // Should be pulled earlier with the name, { name, cleanName, id };
        genres: genres,
        releaseDate: tmdbMovie.release_date,
        runtime: tmdbMovie.runtime,
        connected: true,
      };

      console.log("NEW MOVIE: ", newMovie);

      try {
        // Should do this with tmdbID, but it's not working
        const res = await fetch(
          `http://10.0.0.158:5000/api/movies/tmdbid/${newMovie.tmdbID}`
        );
        let existingMovie = null;
        if (res.status !== 400) existingMovie = await res.json();
        if (!existingMovie) {
          // Add movie to database
          const res = await fetch("http://10.0.0.158:5000/api/movies", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMovie),
          });
          await res.json();
          console.log(`${newMovie.title} added to izzi...`);
        } else {
          // Update Movie
          const res = await fetch(
            `http://10.0.0.158:5000/api/movies/${existingMovie._id}`,
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
          console.log(`${newMovie.title} already exists. Updating...`);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }

  async handleGenres(genres) {
    const genreIds = [];
    for (const key in genres) {
      const genre = genres[key];
      // Check if genre already exists
      try {
        const res = await fetch(
          `http://10.0.0.158:5000/api/genres/${genre.name.toLowerCase()}`
        );
        let existingGenre = null;
        if (res.status !== 400) existingGenre = await res.json();
        if (!existingGenre) {
          // Create new
          const res = await fetch("http://10.0.0.158:5000/api/genres", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: genre.name }),
          });
          const content = await res.json();
          genreIds.push(content._id);
          console.log("NEW: ", content);
        } else {
          genreIds.push(existingGenre._id);
          console.log("OLD: ", existingGenre);
        }
      } catch (err) {
        console.error(err);
      }
    }
    return genreIds;
  }
}

module.exports = movieSrcAnalyzer;
