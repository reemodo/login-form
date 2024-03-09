
const express = require('express');
const router = express.Router();
const users = require('../../fakeDB/users')
const jwt = require('jsonwebtoken');
const secretKey = 'my_secret_key';



router.get('/animals', authenticateToken,(req, res) => {
  try {
    const user = findUser(req.user.id,req.user.username)
    console.log(user)
    const animalSound = {"sound":"wowow"}
    console.log(animalSound)
    res.send(animalSound);
  } catch (error) {
    console.log(error)
    res.status(401).send({ message: 'Invalid token' });
  }
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(401);
    }

    req.user = user;
    next();
  });
}

function findUser(id, username) {
  return users.filter(user => user.id === id && user.username === username)[0]
  ;
}


module.exports = router;
