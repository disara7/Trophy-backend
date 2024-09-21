import mongoose from "mongoose";
import Employee from "./employee.js";

const { Schema } = mongoose;

const registeredUserSchema = new Schema({
  employeeId: {
    type: Schema.Types.ObjectId, 
    ref: Employee,
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    default: false, 
  },
});

const sportSchema = new Schema({
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
  registeredUsers: [registeredUserSchema], 
});

const Sport = mongoose.model("Sport", sportSchema);

export default Sport;
