  const authService = require('../services/db/auth');
  const responseTransformer = require('../middlewares/transformResponse');
  const authValidator = require('../validators/auth')
  const auth = {};

/** creating new user 
 * EndPoint:- /auth/register
 * HTTP Method: - POST
 * res:{}
 * Body : email, password, fullName & userType
 * 
 */
  auth.signUp = async (req, res, next) => {
    try {
      const result = await authService.signup(req.body);
      return responseTransformer(res, result, 'Logged User Successfully', true);
      // res.send(result);
    } catch (e) {
      if(e.message ="Email already exist") return responseTransformer(res, e, 'User Already exists', false);
      return responseTransformer(res, e, 'Login User Failed', false);
    }
  };
  
/** setting up new password using link
 * EndPoint:- /auth/login
 * HTTP Method: - POST
 * res:{}
 * Body : email, password
 */

  auth.login = async (req, res, next) => {
    try {
      const result = await authService.login(req.body);
      return responseTransformer(res, result, 'Logged User Successfully', true);
    } catch (e) {
      return responseTransformer(res, e, 'Login User Failed', false);
    }
  };
  
  auth.changePassword = async (req, res, next) => {
    // const validate = authValidator.validateChangePassword(req);
    // if (validate.length) {
    //   return responseTransformer(
    //     res,
    //     validate,
    //     'Schema Validation Failed',
    //     false
    //   );
    // }
    try {
      const result = await authService.changePassword(req);
      return res.send(result);
      // return responseTransformer(res, result, 'Changed Password  Successfully', true);
    } catch (e) {
      return responseTransformer(res, e, 'Change Password User Failed', false);
    }
  };
  
  auth.forgotPassword = async (req, res, next) => {
    // const validate = authValidator.validateForgotPassword(req);
    // if (validate.length) {
    //   return responseTransformer(
    //     res,
    //     validate,
    //     'Schema Validation Failed',
    //     false
    //   );
    // }
    try {
       const result = await authService.passwordResetMail(req.body);
      return responseTransformer(res, result, 'Sent Reset Email  Successfully', true);
    } catch (e) {
      return responseTransformer(res, e, 'Failed to send reset email', false);
    }
  };
  
/** setting up new password using link
 * EndPoint:- /auth/restPassword
 * HTTP Method: - POST
 * res:{}
 * Query Params : token, id
 * Endpoint With Query Params:- /users?filter=active&limit=10
 */
  auth.resetPassword = async (req, res, next) => {
    try {
       const result = await authService.resetPassword(req.query);
      return responseTransformer(res, result, 'Sent Reset Email  Successfully', true);
    } catch (e) {
      return responseTransformer(res, e, 'Failed to send reset email', false);
    }
  };
  /** refresh the token  */
  auth.refreshToken = async (req, res, next) => {
    try {
      const result = await authService.refreshToken(req);
      return responseTransformer(res, result, 'Refreshed Token', true);
    } catch (e) {
      return responseTransformer(res, e, 'Falied to get token', false);
    }
  };
  
  
  module.exports = auth;
  