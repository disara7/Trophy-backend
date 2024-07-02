// activityRoutes.js

const express = require("express");
const router = express.Router();
const activityController = require("../Database/controller/activity_controller");

// GET all activities
router.get("/Activities", getActivities);

module.exports = router;
