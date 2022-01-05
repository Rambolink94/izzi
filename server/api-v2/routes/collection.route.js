const express = require("express");
const controller = require("../controllers/collection.controller.js");
const router = express.Router();

router.get("/all", controller.getAllCollections);
router.post("/create", controller.createCollection);
router.post("/connect", controller.createCollectionConnection);

module.exports = router;
