const knex = require("../../database");
const { userService } = require("../services");

// Get all users
const getAllUsers = async (req, res) => {
  knex
    .select("*")
    .from("users")
    .then((users) => res.json(users))
    .catch((error) =>
      res.json({ message: `There was an error retrieving users: ${error}` })
    );
};

// Create a user
const createUser = async (req, res) => {
  console.log(req.body);
  if (!req.body.username) {
    res.send("Body Empty");
    return;
  }
  knex("users")
    .insert({
      username: req.body.username,
      allow_adult_content: req.body.allow_adult_content,
      profile_image: req.body.profile_image,
    })
    .then(() => {
      res.json({ message: `User '${req.body.username}' created.` });
    })
    .catch((error) => {
      res.json({
        message: `There was an error creating user ${req.body.username}: ${error}`,
      });
    });
};

const updateMovieProgress = async (req, res) => {
  const { userId, movieId, timeElapsed } = req.body;

  const result = await userService.createMovieProgress(
    userId,
    movieId,
    timeElapsed
  );

  res.status(200).send(result);
};

// Delete a user
const deleteUser = async (req, res) => {
  knex("users")
    .where("id", req.body.id)
    .del()
    .then(() => {
      res.json({
        message: `User with ID of '${req.body.id}' deleted.`,
      });
    })
    .catch((error) => {
      res.json({
        message: `There was an error trying to delete user with ID of '${req.body.id}: ${error}`,
      });
    });
};

module.exports = {
  getAllUsers,
  createUser,
  updateMovieProgress,
  deleteUser,
};
