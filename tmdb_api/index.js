const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const search = require("./routes/search");
const movies = require("./routes/movies");
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
app.use("/api/genres", genres);
app.use("/api/tmdb", tmdbPaths);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
