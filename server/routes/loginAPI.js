const express = require('express');
const router = express.Router();
const users = require('../../fakeDB/users');

//TODO: ADD the following
//we generate the salt for the password
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
//we generate the salt for the password
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

//rest of code

function hashPassoword (user){
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  return  hashedPassword;
}

function authenticateUser(username, password) {
  const user = users.find(u => u.username === username);
  if (!user) {
    return null;
  }
  const isPasswordValid = bcrypt.compareSync(password, hashPassoword(user.password));
  if (!isPasswordValid) {
    return null;
  }
  return { id: user.id, username: user.username };
}
function generateAccessToken(user) {
  return jwt.sign(user, secretKey);
}


router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = authenticateUser(username, password);
  if (!user) {
    return res.status(401).send({ message: 'Invalid username or password' });
  }
  const accessToken = generateAccessToken(user);
  res.send({ accessToken });
});
const secretKey = 'my_secret_key';



module.exports = router;
