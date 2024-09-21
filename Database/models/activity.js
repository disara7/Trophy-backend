// Database/models/activity.js
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Employee from "./employee.js";

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
  registeredEmployees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: Employee, 
    default: [],
  }],
  qrCodeUrl: {
    type: String,
    default: "",
  },
  uniqueKey: {
    type: String,
    default: "",
  },
});

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;
