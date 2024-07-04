const mongoose = require("mongoose");
const Employee = require("./employee");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    ref: Employee
  },
  dailyChallenge: {
    type: Number,
    default: 0
  },
  completedChallenges: {
    type: Number,
    default: 0
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;
