import Admin from "../models/admin.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { generateAccessToken } from "../../authHelpers.js";
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const addAdmin = async (req, res, next) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const admin = new Admin({
      companyName: req.body.companyName,
      email: req.body.email,
      password: hashedPassword,
    });
    admin
      .save()
      .then((response) => {
        res.status(200).json(response);
      })
      .catch((error) => {
        res.json({ error });
      });
  };
  const verifyAdmin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return res.status(401).json({ message: 'Authentication failed. Admin not found.' });
      }
      
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Authentication failed. Incorrect password.' });
      }
      const adminId = admin._id.toString();
      const token = generateAccessToken(adminId);
      return res.status(200).json({ token });
    } catch (error) {
      
      return res.status(500).json({ message: 'An error occurred.', error: error.message });
    }
  };

  const verifyToken = (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ message: 'Token is required' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid token', error: err.message });
      }
  
      return res.status(200).json({ message: 'Token is valid', userId: decoded.userId });
    });
  };
  
  export default { addAdmin, verifyAdmin, verifyToken };