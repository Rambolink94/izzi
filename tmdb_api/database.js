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

const Course = mongoose.model("Movie", movieSchema);
const course = new Course({
  name: "The Mummy",
  director: "Unkown",
  description: "The legend you know. The adventure you have yet to imagine.",
  poster_path: "/yhIsVvcUm7QxzLfT6HW2wLf5ajY.jpg",
  release_date: new Date("1999-04-16"),
  runtime: 124,
});
