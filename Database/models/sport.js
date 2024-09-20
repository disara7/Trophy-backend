import mongoose from "mongoose";

const { Schema } = mongoose;

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
});

const Sport = mongoose.model("Sport", sportSchema);

export default Sport;
