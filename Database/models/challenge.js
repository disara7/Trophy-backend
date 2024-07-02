const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const challengeSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  dailyChallenge: {
    type: Number,
  },
  completedChallenges: {
    type: Number,
  },
});

const Challenge = mongoose.model("Challenge", challengeSchema);
module.exports = Challenge;
