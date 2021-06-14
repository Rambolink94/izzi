const fs = require("fs");
const fsPromises = fs.promises;
const fetch = require("node-fetch");

const location = "D:\\Knight's Movies";

class movieSrcAnalyzer {
  getMovieTitles() {
    try {
      return fsPromises.readdir(location);
    } catch (err) {
      console.error(err);
    }
  }

  async getTMDBids(names) {
    let cleanNames = names.map((name) => {
      name = name.replace(/\.[^/.]+$/, "");
      name = name.replace("_", " ");
      name = name.toLowerCase();
      return name;
    });

    try {
      const ids = await Promise.all(
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
      );
      console.log("ANALYZER: ", ids);
      return ids;
    } catch (err) {
      console.error(err);
    }
  }

  async createMovies(ids) {
    await Promise.all(
      ids.map(async (id) => {
        // Get movie info
        const res = await fetch(`http://localhost:5000/api/tmdb/${id}`);
        const tmdbMovie = await res.json();
        console.log(tmdbMovie);
        // Generate movie structure

        // Add movie to database
        /* const res = await fetch("http://localhost:5000/api/movies", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ a: 1, b: "Textual content" }),
        });
        const content = await res.json(); */
      })
    );
    console.log(ids);
  }
}

module.exports = movieSrcAnalyzer;
