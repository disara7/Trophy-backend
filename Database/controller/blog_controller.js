import Blog from '../models/blog.js';
import { db, doc, setDoc } from '../../Firebase/firebase-config.js';

const addBlog = async (req, res, next) => {
    const userId = req.userId;
  try {
    // Extract data from the request body
    const { title, subtitle, category, content, state, date } = req.body;

    // Create a new Blog instance
    const newBlog = new Blog({
      userId: userId,
      title: title,
      subtitle: subtitle,
      category: category,
      content: content,
      state: state,
      date: date,
    });

    // Save the blog to MongoDB
    const savedBlog = await newBlog.save();
    // Save the blog to Firestore
    await setDoc(doc(db, "blogs", savedBlog._id.toString() ), {
      userId: userId,
      views: 0
    });
    // Respond with success and the saved blog data
    res.status(201).json(savedBlog);
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


const getBlog = async (req, res, next) => {
    const userId = req.userId;

    try {
      const articles = await Blog.find({ userId }, 'title subtitle');
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export default {addBlog, getBlog};
