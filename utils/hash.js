const bcrypt = require('bcryptjs');

const saltRounds = 10; 

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
