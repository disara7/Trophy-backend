require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./Database/router");

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
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
