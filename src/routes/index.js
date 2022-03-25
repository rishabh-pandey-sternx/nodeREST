const express = require('express');
const router = express.Router();
const authRoute = require('./auth');
const userRoute = require('./user');
const listRoute = require('./list');
const userController = require('../controllers/user.controller');

const { verifyJwt} = require('../middlewares/express-jwt');
/** public Routes */

// check if server is running
router.get('/', (req, res) => {
    return res.send('Ok');
  });
  
// mounting all authorization and user stuff routes at /auth
router.use('/auth', authRoute);

/** Private Routes */

// mount all userRoute privileges routes at /users
router.use('/users',verifyJwt, userRoute);

// mount user routes at /user
router.get('/user', verifyJwt, userController.aboutMe);

// mount all listRoute privileges routes at /lists
router.use('/lists', verifyJwt, listRoute);

// If the route is protected and token is expired or not provided returing 401 status code
router.use('*', (err, req, res, next) => {
  if (!err) {
    return next();
  }
  switch (err.name) {
    case 'UnauthorizedError':
      return res
        .status(401)
        .send({ message: 'Invalid Token', success: false, data: {} });
    default:
      return next();
  }
});


module.exports= router;


