const { get } = require('lodash');
const jwt = require('jsonwebtoken');
const jwtLib = require('../../utils/jwt');

let service = {};

// creates jwt token
service.createToken = user => {
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      userType: user.userType
    },
    process.env.APP_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );

  return token;
};

// verfiy jwt token
service.verifyToken = token => {
  const user = jwtLib.verify(token);
  return user;
};

// refresh jwt token
service.refreshToken = async req => {
  // do error handling here
  // getToken
  const jwtToken = service.getToken(req);
  // verifyToken
  const user = service.verifyToken(jwtToken);
  // createToken
  return service.createToken(user);
};

// extract jwt token from request
service.getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  logger.info({ msg: 'No token', functionName: 'create' });

  return '';
};


module.exports = service;
