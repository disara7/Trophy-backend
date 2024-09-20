import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Employee from "./employee.js";

const blogSchema = new Schema({
  userId: {
    type: String,
    ref: Employee
  },
  articleId: {
    type: String,
    unique: true,
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
  },
  state: {
    type: String,
  },
  date: {
    type: Date,
  }
});

blogSchema.pre('save', function(next) {
  if (!this.articleId) {
    this.articleId = this._id.toString();
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
