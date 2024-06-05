const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./Database/router");

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://dushyanthaat:Trophy24@trophycluster.nuvoo5n.mongodb.net/?retryWrites=true&w=majority&appName=TrophyCluster";

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Database conncted!");
  } catch (error) {
    console.log(error.message());
  }
};

connect();

const server = app.listen("3001", "localhost", () =>
  console.log("Server is running")
);

app.use("/api", router);
