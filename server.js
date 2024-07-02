// Load environment variables from .env file
require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activityRoutes");

const PORT = 80;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./Database/router");

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/act", activityRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello");
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected!");
  } catch (error) {
    console.log("Error connecting to database:", error.message);
  }
};

connectDB();
