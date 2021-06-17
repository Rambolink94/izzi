const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const search = require("./routes/search");
const movies = require("./routes/movies");
const streaming = require("./routes/streaming");
const genres = require("./routes/genres");
const tmdbPaths = require("./routes/tmdb-paths");

mongoose
  .connect("mongodb://localhost/izzi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());
// Assigning routers
app.use("/api/search/", search);
app.use("/api/movies/", movies);
app.use("/api/streaming/", streaming);
app.use("/api/genres", genres);
app.use("/api/tmdb", tmdbPaths);

const movieSrcAnalyzer = require("../izzi-server/movieSrcAnalyzer");
const analyzer = new movieSrcAnalyzer();

//These calls need to eventually be moved elsewhere, but for now this works
async function test() {
  const names = await analyzer.getMovieTitles();
  const ids = await analyzer.getTMDBids(names, false);
  //await analyzer.createMovies(results.ids);
  console.log("DONE!");
}

test();

// This will probably fail on some systems if something is already listening on this port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
