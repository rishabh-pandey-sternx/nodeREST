const expressJwt = require('express-jwt');

const jwtLib = require('../utils/jwt');

const validateJwt = (req, res, next) => {
  return expressJwt(
    { secret: process.env.APP_SECRET || "salnasl",  algorithms: ['HS256'] },
  
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '24h'
    }
  );
};

const verifyJwt = (req, res, next) => {
  const token = jwtLib.tokenFromHeaders(req);
  const user = jwtLib.decode(token);
  if (user) {
    return next();
  } else
    return res.send({
      data: {},
      success: false,
      message: 'Invalid Token'
    });
};

module.exports = { verifyJwt, validateJwt };
