const express = require("express");
const router = express.Router();
const activityController = require("../controllers/activity_controller");

// GET all activities
router.get("/activities", activityController.getActivities);

// POST a new activity
router.post("/activities", activityController.addActivity);

module.exports = router;
