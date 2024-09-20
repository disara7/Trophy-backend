import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY;

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '30d' });
};

const verifyToken = (req, res, next) => {
  
  if (!req.headers['authorization']) {
    console.error('Missing Authorization header in request headers:', req.headers);
    return res.status(403).json({ message: 'No token provided' });
  }

  const token = req.headers['authorization'].split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') { 
        console.log("Expired");
        return res.status(401).json({ message: 'Unauthorized: Token expired' });
      } else {
        console.error('Error verifying token:', err.message); 
        return res.status(500).json({ message: 'Failed to authenticate token' });
      }
    }

    req.userId = decoded.userId;

    next(); 
  });
};

export {
  generateAccessToken,
  verifyToken
};
