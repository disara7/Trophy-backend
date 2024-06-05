const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const aiTherapistSchema = new Schema({
  therapistId: {
    types: String,
  },
  name: {
    type: String,
  },
});

const AiTherapist = mongoose.model("Aitherapist", aiTherapistSchema);
module.exports = AiTherapist;
