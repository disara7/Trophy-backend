require('dotenv').config();
const express = require('express')
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const homeRoute = require('./routes/home');

const PORT = 80;
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const server = http.createServer(app);
const io = socketIo(server);

const router = require("./Database/router");

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}))

app.use((req, res, next) => {
  req.io = io;
  next();
});


app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.use('/fetch', homeRoute);



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

app.use("/api", router);



