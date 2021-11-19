const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
require('dotenv').config();

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = { userId: decodedToken.userId };
    console.log("I am Middleware Authentication");
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    console.log("Authentication Failed");
    return next(error);
  }
};