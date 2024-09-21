import mongoose from "mongoose";
import Employee from "./employee.js";
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
    default: 100
  },
  noOfCoinsGifted: {
    type: Number,
    default: 0
  }
});

const Coinbank = mongoose.model("Coinbank", CoinBankSchema);
export default Coinbank;
