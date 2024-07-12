const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Employee = require("./employee");

const blogSchema = new Schema({
  userId: {
    type: String,
    unique: true,
    ref: Employee
  },
  articleId: {
    type: String,
  },
  title: {
    type: String,
  },
  subtitle: {
    type: String,
  },
  category: {
    type: String,
  },
  content: {
    type: String,
  }
});

blogSchema.pre('save', function(next) {
  if (!this.articleId) {
    this.articleId = this._id.toString();
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
