const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://${process.env.IP_ADDRESS}/izzi`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const genreSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const movieSchema = new mongoose.Schema({
  tmdb_id: { type: Number, required: true },
  title: { type: String, required: true },
  director: String,
  description: { type: String, required: true },
  poster_path: { type: String, required: true },
  video_src: { type: String, required: true },
  genres: {
    type: Array,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message:
        "A Movie must have at least one genre. Otherwise it will not appear on izzi.",
    },
  },
  release_date: Date,
  runtime: { type: Number, required: true },
});

// CREATE
const Movie = mongoose.model("Movie", movieSchema);
async function createMovie(tmdbData = null) {
  const movie = new Movie({
    tmdb_id: 564,
    title: "The Mummy.",
    director: "Unkown",
    description: "Evil boy returns.",
    poster_path: "/yhIsVvcUm7QxzLfT6HW2wLf5ajY.jpg",
    video_src: "",
    genres: [],
    release_date: new Date("2016-04-16"),
    runtime: 124,
  });

  try {
    const result = await movie.save();
    console.log(result);
  } catch (ex) {
    console.error(ex.message);
  }
}

// GET
async function getMovies() {
  const movies = await Movie.find({}).limit(10).sort({ title: 1 });
  console.log(movies);
}

async function getMovie(id) {
  const movie = await Movie.find({ _id: id }).limit(1);
  console.log(movie);
}

getMovie("60c29bd3a58be759b0647cc5");
