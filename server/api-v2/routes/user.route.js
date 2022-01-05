const express = require("express");
const controller = require("../controllers/user.controller.js");
const router = express.Router();

router.get("/all", controller.getAllUsers);
router.post("/create", controller.createUser);
router.post("/updateProgress", controller.updateMovieProgress);
router.post("/delete", controller.deleteUser);

module.exports = router;
