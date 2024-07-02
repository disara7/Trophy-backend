const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  coinCount: {
    type: Number,
    required: true,
  },
  activitiesdetails: {
    type: String,
    required: true,
  },
  activitiesmainimgUrl: {
    type: String,
    required: true,
  },
  activitydate: {
    type: Date,
    required: true,
  },
  activitytime: {
    type: String,
    required: true,
  },
  activityvenue: {
    type: String,
    required: true,
  },
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
