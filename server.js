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
const uri = process.env.MONGO_URI;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Routes
app.use("/auth", authRoutes);
app.use("/api", activityRoutes);

app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database conncted!");
  } catch (error) {
    console.log(error.message);
  }
};

connect();

// const server = app.listen("3001", "localhost", () =>
//   console.log("Server is running")
// );

app.use("/api", router);
