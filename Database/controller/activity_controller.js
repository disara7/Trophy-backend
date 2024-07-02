// activity_controller.js

const Activity = require("../models/activity");

// Get all activities
const getActivities = (req, res, next) => {
  Activity.find()
    .then((activities) => {
      res.json({ activities });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

// Add a new activity
const addActivity = (req, res, next) => {
  const {
    title,
    description,
    imageUrl,
    coinCount,
    activitiesdetails,
    activitiesmainimgUrl,
    activitydate,
    activitytime,
    activityvenue,
  } = req.body;

  const newActivity = new Activity({
    title,
    description,
    imageUrl,
    coinCount,
    activitiesdetails,
    activitiesmainimgUrl,
    activitydate,
    activitytime,
    activityvenue,
  });

  newActivity
    .save()
    .then((activity) => {
      res.status(201).json({ activity });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

module.exports = {
  getActivities,
  addActivity,
};
