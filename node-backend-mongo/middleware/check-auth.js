const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');

module.exports = (req, res, next) => {
  // The browser automatically sends out 'OPTIONS' requests before it sends the actual 
  // request you want to send(basically anything but get requests.), to find out whether 
  // the server will permit the actual request to be sent, this is just a convention. 
  // Thus before we try creating the token or getting the token, we want to check if 
  // the request method is equal to 'OPTIONS' and if it is, we will return next and allow 
  // this request to continue.
  if (req.method === 'OPTIONS') {
    return next();
  }
  try {
    // we check tokens in header, req.headers.authorization.split(' ')[0] is 'Bearer'
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    // verify the token, remember to use exact private key in controller
    // .verify(token,privatekey) returns the payload if succeed,throw an error if fails
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userData = { userId: decodedToken.userId };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 401);
    return next(error);
  }
};
