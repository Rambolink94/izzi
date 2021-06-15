const fs = require("fs");
const fsPromises = fs.promises;
const fetch = require("node-fetch");

const baseDirectory = "D:\\Knight's Movies";

class movieSrcAnalyzer {
  getMovieTitles() {
    try {
      return fsPromises.readdir(baseDirectory);
    } catch (err) {
      console.error(err);
    }
  }

  async getTMDBids(names) {
    // Runs a bit slow. Likely can increase its speed
    let cleanNames = names.map((name) => {
      name = name.replace(/\.[^/.]+$/, "");
      name = name.replace("_", " ");
      name = name.toLowerCase();
      return name;
    });

    try {
      const ids = [];
      let testCount = 10;
      let isTest = true;
      for (const index in cleanNames) {
        const name = cleanNames[index];
        const res = await fetch(`http://localhost:5000/api/search/${name}`);
        const movies = await res.json();
        if (movies.results[0] !== undefined) {
          console.log("Name: ", name, "\t\t ID: ", movies.results[0].id);
          if (!(movies.results.length > 1)) {
            console.log(`-----: Accepted (${movies.results[0].id}) :-----`);
            ids.push(movies.results[0].id);
          }
        }
        if (isTest && testCount <= 0) break;
        testCount--;
      }
      console.log(ids);
      return ids;
      /* return (ids = await Promise.all(
        cleanNames.map(async (name) => {
          const res = await fetch(`http://localhost:5000/api/search/${name}`);
          const movies = await res.json();
          //console.log("Name: ", name, " -- ID: ", movies.results[0].id);
          if (!(movies.results.length > 1)) {
            console.log("REAL: ", movies.results[0].id);
            return movies.results[0].id;
          }
          console.log("----: ", movies.results[0].id);
          return null;
        })
      )); */
    } catch (err) {
      console.error(err);
    }
  }

  async createMovies(ids) {
    for (const index in ids) {
      const id = ids[index];

      // Get movie info
      const res = await fetch(`http://localhost:5000/api/tmdb/${id}`);
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
        videoSrc: "N/A", // Should be pulled earlier with the name, { name, cleanName, id };
        genres: genres,
        releaseDate: tmdbMovie.release_date,
        runtime: tmdbMovie.runtime,
        connected: true,
      };

      console.log("NEW MOVIE: ", newMovie);

      // Add movie to database
      try {
        const res = await fetch(
          `http://localhost:5000/api/movies/tmdb/${newMovie.tmdbID}`
        );
        let existingMovie = null;
        if (res.status !== 400) existingMovie = await res.json();
        if (!existingMovie) {
          const res = await fetch("http://localhost:5000/api/movies", {
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
          console.log(`${newMovie.title} already exists.`); // Perhaps update the movie instead.
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
          `http://localhost:5000/api/genres/${genre.name.toLowerCase()}`
        );
        let existingGenre = null;
        console.log(res.status);
        if (res.status !== 400) existingGenre = await res.json();
        if (!existingGenre) {
          // Create new
          console.log("RESPONSE BODY:: ", JSON.stringify({ name: genre.name }));
          const res = await fetch("http://localhost:5000/api/genres", {
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
