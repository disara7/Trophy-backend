const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
},
  level: {
    type: Number,
  },
});

module.exports = mongoose.model('Progress', ProgressSchema);
