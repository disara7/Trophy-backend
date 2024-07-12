const Blog = require('../models/blog');

const addBlog = async (req, res, next) => {
    const userId = req.userId;
  try {
    // Extract data from the request body
    const { title, subtitle, category, content } = req.body;

    // Create a new Blog instance
    const newBlog = new Blog({
      userId: userId,
      title: title,
      subtitle: subtitle,
      category: category,
      content: content,
    });

    // Save the blog to MongoDB
    const savedBlog = await newBlog.save();
    // Respond with success and the saved blog data
    res.status(201).json(savedBlog);
  } catch (error) {
    // Handle errors gracefully
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.addBlog = addBlog;
