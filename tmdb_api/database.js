const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/izzi", { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  description: String,
  poster_path: String,
  release_date: Date,
  runtime: Number,
});

const Movie = mongoose.model("Movie", movieSchema);
async function createMovie() {
  const movie = new Movie({
    title: "The Mummy.",
    director: "Unkown",
    description: "Evil boy returns.",
    poster_path: "/yhIsVvcUm7QxzLfT6HW2wLf5ajY.jpg",
    release_date: new Date("2016-04-16"),
    runtime: 124,
  });

  const result = await movie.save();
  console.log(result);
}

async function getMovies() {
  const movies = await Movie.find({})
    .limit(10)
    .sort({ title: 1 })
    .select({ title: 1, description: 1 });
  console.log(movies);
}

getMovies();
