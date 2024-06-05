const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const coinbankSchema = new Schema({
  coinbankId: {
    type: String,
  },
  noOfCoinsRedeemed: {
    type: String,
  },
  noOfCoinsEarned: {
    type: String,
  },
});

const Coinbank = mongoose.model("Coinbank", coinbankSchema);
module.export = Coinbank;
