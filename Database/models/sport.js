// Database/models/activity.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema({
  sporttitle: {
    type: String,
    required: true,
  },
  sportdescription: {
    type: String,
    required: true,
  },
  sportimageUrl: {
    type: String,
    required: true,
  },
  sportcoinCount: {
    type: Number,
    required: true,
  },
  sportdetails: {
    type: String,
    required: true,
  },
  sportmainimgUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const Sport = mongoose.model("Sport", sportSchema);

module.exports = Sport;