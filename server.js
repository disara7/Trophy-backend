// server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activityRoutes");

const PORT = 3005;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./Database/router");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/auth", authRoutes);

// Define route for getting activities
app.use("/act", activityRoutes);

// Root Route
app.get("/", (req, res) => {
  res.send("Hello");
});

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
    console.log(error.message);
  }
};

connectDB();
