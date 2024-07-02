const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CoinBankSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
  },
  noOfCoinsRedeemed: {
    type: Number,
  },
  noOfCoinsEarned: {
    type: Number,
  },
});

const Coinbank = mongoose.model("Coinbank", CoinBankSchema);
module.export = Coinbank;
