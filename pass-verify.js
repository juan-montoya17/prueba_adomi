const bcrypt = require('bcrypt');

async function verifyPassword() {
  const myPassword = '12345678';
  const hash = '$2b$10$7luFD3A2hQdJwWmLjfLohelZj7FdUahFF.FiPYDv4339zin4UB68u';
  const isMatch = await  bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

verifyPassword();
