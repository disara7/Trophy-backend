import Blog from '../models/blog.js';
import { db, doc, setDoc, ref, storage, uploadBytes, getDownloadURL, getDoc } from '../../Firebase/firebase-config.js';
import { v4 as uuidv4 } from 'uuid';
import Employee from "../models/employee.js";
const addBlog = async (req, res, next) => {
  const userId = req.userId;
  try {
    // Extract data from the request body
    const { title, subtitle, category, content, state, date } = req.body;
    const image = req.file; 

    let imageUrl = null;

    if (image) {
      const imageBuffer = image.buffer;
      const imageExtension = image.mimetype.split('/')[1];
      const imageName = `blogs/${uuidv4()}.${imageExtension}`;

      // Create a reference to Firebase Storage
      const storageRef = ref(storage, imageName);

      // Upload the image to Firebase Storage
      const snapshot = await uploadBytes(storageRef, imageBuffer);

      // Get the download URL of the uploaded image
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    // Create a new Blog instance
    const newBlog = new Blog({
      userId,
      title,
      subtitle,
      category,
      content,
      imageUrl,
      state,
      date,
    });

    // Save the blog to MongoDB
    const savedBlog = await newBlog.save();

    // Save the blog to Firestore
    await setDoc(doc(db, "blogs", savedBlog._id.toString()), {
      userId,
      views: 0,
      imageUrl,
    });

    // Respond with success and the saved blog data
    res.status(201).json(savedBlog);
  } catch (error) {
    // Handle errors gracefully
    console.error('Error in addBlog:', error);
    res.status(500).json({ error: 'An error occurred while adding the blog' });
  }
};

const getBlog = async (req, res, next) => {
    const userId = req.userId;

    try {
      const articles = await Blog.find({ userId });
      res.status(200).json(articles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

const fetchBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ state: 'In Review' });
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
}
const fetchAcceptedBlogs = async (req, res, next) => {
  try {
    const { page = 1, category = 'All' } = req.query; // Get page and category from query parameters
    const limit = 10; // Define how many blogs to return per page
    const skip = (page - 1) * limit;

    // Base query: Only blogs with state 'accepted'
    let query = { state: 'accepted' };

    // Add category filter if the category is not "All"
    if (category !== 'All') {
      query.category = category;
    }

    // Fetch the blogs based on the query with pagination
    const blogs = await Blog.find(query)
      .skip(skip)
      .limit(limit);

    // Get the total count of accepted blogs for pagination metadata
    const totalBlogs = await Blog.countDocuments(query);

    // Calculate total pages
    const totalPages = Math.ceil(totalBlogs / limit);

    // Respond with blogs and pagination information
    res.json({
      currentPage: parseInt(page),  // Convert to an integer
      totalPages: totalPages,
      blogs: blogs,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching accepted blogs' });
  }
};

const popularPosts = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ state: 'accepted' })
      .sort({ views: -1 })
      .limit(10);   

      const blogsWithAuthor = await Promise.all(
        blogs.map(async (blog) => {
          const employee = await Employee.findOne({ employeeId: blog.userId });
          const employeeName = employee ? employee.employeeName : 'Unknown Author'; 
  
          return {
            ...blog._doc, 
            employeeName, 
          };
        })
      );

      // Return blogs with author name
      res.json(blogsWithAuthor);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching blogs' });
  }
}

const deleteBlog = async (req, res) => {
  const { articleId } = req.params;
  try {
    const result = await Blog.findByIdAndDelete(articleId);
    if (result) {
      return res.status(200).json({ message: 'Blog deleted successfully' });
    } else {
      return res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting blog', error });
  }
};

const acceptBlog = async (req, res) => {
  const { articleId } = req.params;
  try {
    const result = await Blog.findByIdAndUpdate(
      articleId, 
      { state: 'accepted' }, 
      { new: true }
    );
    if (result) {
      return res.status(200).json({ message: 'Blog accepted successfully', blog: result });
    } else {
      return res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Error accepting blog', error });
  }
};




export default {addBlog, getBlog, fetchBlogs, fetchAcceptedBlogs, popularPosts, deleteBlog, acceptBlog};
