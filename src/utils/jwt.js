const jwt = require('jsonwebtoken');

let lib = {};

lib.signIn = (email, id) => {
  return jwt.sign(
    { email, id },
    process.env.APP_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN
    }
  );
};

lib.decode = token => {
  return jwt.decode(token, process.env.APP_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

lib.verify = token => {
  return jwt.verify(token, process.env.APP_SECRET);
};

lib.tokenFromHeaders = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  return '';
};

lib.isSecured = (req, res, next) =>
  expressJwt({ secret: process.env.APP_SECRET });

module.exports = lib;
