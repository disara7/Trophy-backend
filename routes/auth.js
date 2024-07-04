const express = require('express');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../authHelpers');
const Employee = require('../Database/models/employee');
const router = express.Router();



const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = await Employee.findOne({ userName: username });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or OTP' });
  }

  if (user.firstLogin) {
    if (!await user.compareOTP(password)) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }
    return res.status(200).json({ message: 'OTP verified. Please change your password.', firstLogin: true });
  } else {
    if (!await user.comparePassword(password)) {
      return res.status(401).json({ message: 'Invalid password' });
    }
  }

  const token = generateAccessToken(user.employeeId);
  return res.status(202).json({ token });
};


const changePassword = async (req, res) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(400).json({ message: 'Username and new password are required' });
  }

  const user = await Employee.findOne({ userName: username });
  if (!user || !user.firstLogin) {
    return res.status(400).json({ message: 'Invalid request' });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  user.passwordHash = hashedPassword;
  user.otp = null;
  user.otpExpiry = null;
  user.firstLogin = false;
  await user.save();
  
  const token = generateAccessToken(user.employeeId);

  if(user.passwordHash){
    return res.status(200).json({ token });
  };
};



router.post('/login', login);
router.post('/change-password', changePassword);

module.exports = router;

