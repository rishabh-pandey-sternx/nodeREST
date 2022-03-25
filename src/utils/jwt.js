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

lib.isSecured = (req, res, next) =>
  expressJwt({ secret: process.env.APP_SECRET });

  // creates jwt token
lib.createToken = user => {
  const token = jwt.sign(
    {
      email: user.email,
      id: user._id,
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
lib.verifyToken = token => {
  const user = lib.verify(token);
  return user;
};

// refresh jwt token
lib.refreshToken = async req => {
  // do error handling here
  // getToken
  const jwtToken = lib.getToken(req);
  // verifyToken
  const user = lib.verifyToken(jwtToken);
  // createToken
  return lib.createToken(user);
};

// extract jwt token from request
lib.getToken = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  }

  logger.info({ msg: 'No token', functionName: 'create' });

  return '';
};

module.exports = lib;
