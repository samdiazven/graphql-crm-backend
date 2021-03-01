const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

const createToken = (user, secret, expiresIn) => {
  const {email, id, name, lastname, role, created} = user;
  return jwt.sign({email, name, lastname, id, role, created}, secret, {expiresIn});
}

const getMe = token => {
    const user = jwt.verify(token, process.env.SECRET);
    return user;
}

module.exports = {
  createToken,
  getMe
}
