require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const authRoutes = require('./routes/auth');
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});