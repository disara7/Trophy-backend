const Activity = require("../models/activity");

// Get all activities
const getActivities = (req, res, next) => {
  Activity.find()
    .then((activities) => {
      res.json({ activities });
    })
    .catch((error) => {
      res.json({ error });
    });
};

module.exports = {
  getActivities,
};
