const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const search = require("./routes/search");
const movies = require("./routes/movies");
const streaming = require("./routes/streaming");
const genres = require("./routes/genres");
const users = require("./routes/users");
const tmdbPaths = require("./routes/tmdb-paths");
const dotenv = require("dotenv");
const movieSrcAnalyzer = require("../utility/movieSrcAnalyzer");

dotenv.config();

mongoose
  .connect("mongodb://localhost/izzi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(cors());
app.use(express.json());
// Assigning routers
app.use("/api/search/", search);
app.use("/api/movies/", movies);
app.use("/api/streaming/", streaming);
app.use("/api/genres/", genres);
app.use("/api/users/", users);
app.use("/api/tmdb/", tmdbPaths);

//These calls need to eventually be moved elsewhere, but for now this works
async function beginAnalysis() {
  const analyzer = new movieSrcAnalyzer();
  await analyzer.analyze();
}

//beginAnalysis();

// This will probably fail on some systems if something is already listening on this port
const port = process.env.REACT_APP_PORT || 3000;
app.listen(port, () =>
  console.log(`Listening on port ${process.env.REACT_APP_PORT}...`)
);
