import * as dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import homeRoute from './routes/home.js';
// import activityRoutes from './routes/activityRoutes.js';
// import hackathonRoutes from './routes/hackathonRoutes.js';
// import sportRoutes from './routes/sportRoutes.js';
import router from './Database/router.js';

const PORT = 80;
const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({
  extended: true
}))

app.use(bodyParser.json({ limit: '100mb' })); 
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/auth', authRoutes);
app.use('/fetch', homeRoute);

app.use('/auth', authRoutes);
// app.use('/act', activityRoutes);
// app.use('/hack', hackathonRoutes);
// app.use('/spo', sportRoutes);
app.use('/fetch', homeRoute); 

app.get('/', (req, res) => {
  res.send('Hello World'); 
});

const uri = process.env.MONGO_URI;

const connect = async () => {
  try {
    await mongoose.connect(uri);
    console.log('Database connected!');
  } catch (error) {
    console.log(error.message);
  }
};

connect();

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
