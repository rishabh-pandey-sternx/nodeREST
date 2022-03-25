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
    const {value,error} = authValidator.createUser(req,res,next);
    if(error) return responseTransformer(res, error, 'Schema Validation Failed', false);
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
    const {value, error} = authValidator.login(req,res,next);
    if(error) return responseTransformer(res, error, 'Schema Validation Failed', false);
    try {
      const result = await authService.login(req.body);
      return responseTransformer(res, result, 'Logged User Successfully', true);
    } catch (e) {
      if(e.message=='Invalid password') return responseTransformer(res, e, 'Invalid password', false);
      return responseTransformer(res, e, 'Login User Failed', false);
    }
  };
    
  auth.forgotPassword = async (req, res, next) => {
    const {value, error} = authValidator.forgotPassword(req,res,next);
    if(error) return responseTransformer(res, error, 'Schema Validation Failed', false);
    try {
       const result = await authService.passwordResetMail(req.body);
      return responseTransformer(res, result, 'Sent Reset Email  Successfully', true);
    } catch (e) {
      return responseTransformer(res, e, 'Failed to send reset email', false);
    }
  };
  
/** setting up new password using link
 * EndPoint:- /auth/reset-password
 * HTTP Method: - POST
 * res:{}
 * Query Params Manditory : token, id
 * Body Manditory : password
 * Endpoint With Query Params:- /reset-password?token=348c2&id=623c985f
 */
  auth.resetPassword = async (req, res, next) => {
    const {value, error} = authValidator.resetPassword(req,res,next);
    if(error) return responseTransformer(res, error, 'Schema Validation Failed', false);
    try {
       const result = await authService.resetPassword(req.query, req.body);
      return responseTransformer(res, result, 'Password Changed Successfully', true);
    } catch (e) {
      return responseTransformer(res, e, 'Failed to reset password', false);
    }
  };


  
  module.exports = auth;
  