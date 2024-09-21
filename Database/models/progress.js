import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Employee from "./employee.js";

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: Employee
  },
  progressPoint: {
    type: Number,
    default: 0
  },
  targetPoint: {
    type: Number,
    default: 1000
  },
  level: {
    type: Number,
    default: 0
  },
});


const Progress = mongoose.model('Progress', ProgressSchema);
export default Progress;
