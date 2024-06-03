const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.SECRET_KEY;

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).json({ message: 'Failed to authenticate token' });

    req.userId = decoded.userId;
    next();
  });
};

module.exports = {
  generateAccessToken,
  verifyToken
};
