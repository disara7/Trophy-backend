
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const activityRoutes = require("./routes/activityRoutes");
const hackathonRoutes = require("./routes/hackathonRoutes");
const sportRoutes = require("./routes/sportRoutes");

import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import homeRoute from './routes/home.js';


const PORT = 80;
const app = express();
import cors from "cors";
import mongoose from "mongoose";

import router from "./Database/router.js";

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}))

app.use(bodyParser.json({ limit: '100mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/act", activityRoutes);
app.use("/hack", hackathonRoutes);
app.use("/spo", sportRoutes);

app.get("/", (req, res) => {
  res.send("Hello");

app.use('/auth', authRoutes);
app.use('/fetch', homeRoute);


app.get('/', (req, res) => {
  res.send('Hello World');

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

app.use("/api", router);



