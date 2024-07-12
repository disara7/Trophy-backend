const mongoose = require("mongoose");
const Employee = require("./employee");
const Schema = mongoose.Schema;

const CoinBankSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    ref: Employee
  },
  noOfCoinsRedeemed: {
    type: Number,
    default: 0
  },
  noOfCoinsEarned: {
    type: Number,
    default: 0
  },
  noOfCoinsGifted: {
    type: Number,
    default: 0
  }
});

const Coinbank = mongoose.model("Coinbank", CoinBankSchema);
module.exports = Coinbank;
