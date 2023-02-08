const bcrypt = require('bcrypt');

 async function hashPassword() {
  const myPassword = '12345678';
  const hash = await  bcrypt.hash(myPassword, 10);
  console.log(hash);
}

hashPassword();
