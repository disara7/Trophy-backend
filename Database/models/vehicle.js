import mongoose from "mongoose";
const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  vehicleId: {
    type: String,
  },
  model: {
    type: String,
  },
  no_plate: {
    type: String,
  },
  route: {
    type: String,
  },
  carpool_preference: {
    type: String,
  },
  no_of_passengers: {
    type: String,
  },
});

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
