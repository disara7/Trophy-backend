const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hackathonSchema = new Schema({
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
  hackathondetails: {
    type: String,
    required: true,
  },
  hackathonmainimgUrl: {
    type: String,
    required: true,
  },
});

const Hackathon = mongoose.model("Hackathon", hackathonSchema);

module.exports = Hackathon;
