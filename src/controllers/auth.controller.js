  const authService = require('../services/db/auth');
  const responseTransformer = require('../middlewares/transformResponse');
  const authValidator = require('../validators/auth')
  const auth = {};

  auth.signUp = async (req, res, next) => {
    // const validate = authValidator.validateCreate(req);
    // if (validate.length) {
    //   return responseTransformer(
    //     res,
    //     validate,
    //     'Schema Validation Failed',
    //     false
    //   );
    // }
    try {
      const result = await authService.signup(req.body);
      return responseTransformer(res, result, 'Logged User Successfully', true);
      // res.send(result);
    } catch (e) {
      if(e.message ="Email already exist") return responseTransformer(res, e, 'User Already exists', false);
      return responseTransformer(res, e, 'Login User Failed', false);
    }
  };

  auth.login = async (req, res, next) => {
    // const validate = authValidator.validateLogin(req);
    // if (validate.length) {
    //   return responseTransformer(
    //     res,
    //     validate,
    //     'Schema Validation Failed',
    //     false
    //   );
    // }
    try {
      const result = await authService.login(req.body);
      return responseTransformer(res, result, 'Logged User Successfully', true);
      // res.send(result);
    } catch (e) {
      console.log(e, "eee")
      return responseTransformer(res, e, 'Login User Failed', false);
    }
  };
  
  auth.changePassword = async (req, res, next) => {
    const validate = authValidator.validateChangePassword(req);
    if (validate.length) {
      return responseTransformer(
        res,
        validate,
        'Schema Validation Failed',
        false
      );
    }
    try {
      const result = await changePassword(req);
      return res.send(result);
      // return responseTransformer(res, result, 'Changed Password  Successfully', true);
    } catch (e) {
      return responseTransformer(res, e, 'Change Password User Failed', false);
    }
  };
  
  auth.forgotPassword = async (req, res, next) => {
    const validate = authValidator.validateForgotPassword(req);
    if (validate.length) {
      return responseTransformer(
        res,
        validate,
        'Schema Validation Failed',
        false
      );
    }
    try {
    //   const result = await sendPasswordResetEmail(req);
    //   res.send(result);
      // return responseTransformer(res, result, 'Sent Reset Email  Successfully', true);
    } catch (e) {
      return responseTransformer(res, e, 'Failed to send reset email', false);
    }
  };
  
  /** refresh the token  */
  auth.refreshToken = async (req, res, next) => {
    try {
      const result = await refreshToken(req);
      return responseTransformer(res, result, 'Refreshed Token', true);
    } catch (e) {
      return responseTransformer(res, e, 'Falied to get token', false);
    }
  };
  
  module.exports = auth;
  