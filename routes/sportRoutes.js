const express = require("express");
const router = express.Router();
const sportController = require("../Database/controller/sport_controller");

// GET all sports
router.get("/Sports", sportController.getSports);

module.exports = router;
