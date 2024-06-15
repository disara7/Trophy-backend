const express = require('express');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../authHelpers');
const Employee = require('../Database/models/employee');
const router = express.Router();



const login = async (req, res) => {
  const { username, otp } = req.body;

  if (!username || !otp) {
    return res.status(400).json({ message: 'Username and OTP are required' });
  }

  const user = await Employee.findOne({ username });
  if (!user || !user.compareOTP(otp)) {
    return res.status(401).json({ message: 'Invalid username or OTP' });
  }

  if (user.firstLogin) {
    return res.status(200).json({ message: 'OTP verified. Please change your password.', firstLogin: true });
  }

  const token = generateAccessToken(user.employeeId);
  res.json({ token });
};

const changePassword = async (req, res) => {
  const { username, newPassword } = req.body;

  if (!username || !newPassword) {
    return res.status(400).json({ message: 'Username and new password are required' });
  }

  const user = await Employee.findOne({ username });
  if (!user || !user.firstLogin) {
    return res.status(400).json({ message: 'Invalid request' });
  }


  user.passwordHash = newPassword;
  user.otp = null;
  user.otpExpiry = null;
  user.firstLogin = false;
  await user.save();

  const token = generateAccessToken(user.employeeId);
  res.json({ token });
};



router.post('/login', login);
router.post('/change-password', changePassword);

module.exports = router;

