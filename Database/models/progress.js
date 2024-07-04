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


const Progress = mongoose.model('Progress', ProgressSchema);
module.exports = Progress;
