import mongoose from 'mongoose';

const { Schema } = mongoose;

const hackathonSchema = new Schema({
  hacktitle: {
    type: String,
    required: true,
  },
  hackdescription: {
    type: String,
    required: true,
  },
  hackimageUrl: {
    type: String,
    required: true,
  },
  hackcoinCount: {
    type: Number,
    required: true,
  },
  hackathondetails: {
    type: String,
    required: true,
  },
  hackathonmainimgUrl: {
    type: String,
    required: true,
  },
});

const Hackathon = mongoose.model('Hackathon', hackathonSchema);

export default Hackathon;
