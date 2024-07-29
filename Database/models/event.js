import mongoose from "mongoose";
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  eventId: {
    type: String,
  },
  title: {
    type: String,
  },
  venue: {
    type: String,
  },
  date: {
    type: Date,
  },
  time: {
    type: String,
  },
  type: {
    type: String,
  },
  ticket: {
    ticketId: { type: String },
    refno: { type: String },
    seatNo: { type: Number },
  },
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
