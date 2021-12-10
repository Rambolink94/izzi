const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: { type: String, required: true, minlength: 3, maxlength: 50 },
    allowAdultContent: { type: Boolean, required: true, default: true },
    profileImage: { type: String, required: false },
  })
);

const UserProgressEntry = mongoose.model(
  "UserProgressEntry",
  new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    movieId: { type: mongoose.Schema.Types.ObjectId, required: true },
    timeElapsed: { type: Number, required: true },
    runtime: { type: Number, required: true },
  })
);

// Get all users
router.get("/", async (req, res) => {
  const users = await User.find().sort("username");
  res.send(users);
});

// Get single user
router.get("/:id", async (req, res) => {
  const user = await User.findOne(req.params.id);
  res.send(user);
});

// Get user progress on movie
router.get("/progress/:userId/:movieId", async (req, res) => {
  const movieProgress = await UserProgressEntry.findOne({
    userId: req.params.userId,
    movieId: req.params.movieId,
  });
  console.log("HERE");
  res.send(movieProgress ? movieProgress : { timeElapsed: 0 });
});

// Add new or update movie progress for user
router.post("/progress", async (req, res) => {
  console.log(req.body);
  const { error } = validateUserProgressEntry(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  UserProgressEntry.findOneAndUpdate(
    {
      userId: req.body.userId,
      movieId: req.body.movieId,
    },
    {
      timeElapsed: req.body.timeElapsed,
      runtime: req.body.runtime,
    },
    { upsert: true },
    (error) => {
      if (error) return res.send(500, { error: error });

      return res.send(true);
    }
  );
});

// Create new user
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) console.error("NO way!");
  if (error) return res.status(400).send(error.details[0].message);

  let user = new User({
    username: req.body.username,
    allowAdultContent: req.body.allowAdultContent,
    profileImage: req.body.profileImage,
  });
  user = await user.save();
  res.send(user);
});

// Update user
router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      allowAdultContent: req.body.allowAdultContent,
      profileImage: req.body.profileImage,
    },
    { new: true }
  );

  if (!user)
    return res
      .status(400)
      .send(`The user with id of ${req.params.id} could not be found.`);

  res.send(user);
});

// Delete user
router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);

  if (!user)
    return res
      .status(400)
      .send(`The user with id of ${req.params.id} could not be found.`);

  res.send(user);
});

// Initial input validation
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    allowAdultContent: Joi.boolean().required(),
    profileImage: Joi.string(),
  });

  return schema.validate(user);
}

function validateUserProgressEntry(entry) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    timeElapsed: Joi.number().required(),
    runtime: Joi.number().required(),
  });

  return schema.validate(entry);
}

module.exports = router;
