const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  articleId: {
    type: String,
  },
  image: {
    type: Buffer,
  },
  title: {
    type: String,
  },
  text: {
    type: String,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
