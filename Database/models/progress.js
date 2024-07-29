import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
},
  level: {
    type: Number,
  },
});


const Progress = mongoose.model('Progress', ProgressSchema);
export default Progress;
