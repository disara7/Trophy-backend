const express = require("express");
const router = express.Router();
const hackathonController = require("../Database/controller/hackathon_controller");

// GET all hackathons
router.get("/Hackathons", hackathonController.getHackathons);

module.exports = router;
