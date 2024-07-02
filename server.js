// server.js
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activityRoutes");
const PORT = 80;
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

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database connected!");
  } catch (error) {
    console.log(error.message);
  }
};

connect();

// Use router for API routes
app.use("/api", router);
