const express = require("express");
const app = express();
const cors = require("cors");
const collections = require("./server/api-v2/routes/collection.route");
const genres = require("./server/api-v2/routes/genre.route");
const movies = require("./server/api-v2/routes/movie.route");
const users = require("./server/api-v2/routes/user.route");
const tmdb = require("./server/api-v2/routes/tmdb.route");
const movieSrcAnalyzer = require("./server/utility/movieSrcAnalyzer_v2");

require("dotenv").config();

app.use(cors());
app.use(express.json());

// Assigning routers
app.use("/api/collections/", collections);
app.use("/api/genres/", genres);
app.use("/api/movies/", movies);
app.use("/api/users/", users);
app.use("/api/tmdb/", tmdb);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error 500: Aka, something is fucked.");
});

app.use((req, res, next) => {
  res.status(404).send("I could not find what you are looking for.");
});

//These calls need to eventually be moved elsewhere, but for now this works
async function beginAnalysis() {
  const analyzer = new movieSrcAnalyzer();
  await analyzer.analyze();
}

console.log(process.env.REACT_APP_ANALYSIS);
if (process.env.REACT_APP_ANALYSIS) beginAnalysis();

// This will probably fail on some systems if something is already listening on this port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
