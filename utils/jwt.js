const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
  return jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '1h' }); // Adjust expiration time as needed
}
