const express = require('express');
const bcrypt = require('bcryptjs');
const { generateAccessToken } = require('../authHelpers');

const router = express.Router();
const users = {
    testuser: {
      id: '1',
      username: 'testuser',
      passwordHash: bcrypt.hashSync('password123', 10)
    }
  };  



router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Validate username and password
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users[username];
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = generateAccessToken(user.id);
  res.json({ token });
});

module.exports = router;
