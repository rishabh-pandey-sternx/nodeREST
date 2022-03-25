const userService = require("../services/db/user");
const { verifyToken, getToken } = require("../utils/jwt");

const userValidator = require("../validators/user");

const responseTransformer = require("../middlewares/transformResponse");

const controller = {};

/** getting user data based on the id
 * EndPoint:- /users/:id
 * HTTP Method: - GET
 * res:{}
 */

controller.getOneById = async (req, res, next) => {
  try {
    const result = await userService.getOneById(req.params.id);
    if (result) {
      return responseTransformer(res, result, "User Details", true);
    }
    throw new Error("Can-not Find User With This id");
  } catch (error) {
    return responseTransformer(res, error, "Failed to Fetch User", false);
  }
};

/** getting user data based on the token
 * EndPoint:- /user
 * HTTP Method: - GET
 * res:{}
 */

controller.aboutMe = async (req, res, next) => {
  const jwtToken = getToken(req);
  const user = verifyToken(jwtToken);
  try {
    const userData = await userService.getOneByEmail(user.email.toLowerCase());
    return responseTransformer(res, userData, "Details of a User", true);
  } catch (err) {
    return responseTransformer(
      res,
      err,
      "Failed to Fetch Details Of User",
      false
    );
  }
};

/** getting all users data
 * EndPoint:- /users
 * HTTP Method: - GET
 * res:{}
 * Query Params : filter, limit, pageNo, query
 * Endpoint With Query Params:- /users?filter=active&limit=10
 */

controller.getAll = async (req, res, next) => {
  try {
    const result = await userService.getAll(req.query);
    return responseTransformer(res, result, "List of All Users", true);
  } catch (error) {
    return responseTransformer(res, error, "Failed to Load All Users", false);
  }
};

/** creating new user with provide data
 * EndPoint:- /users
 * HTTP Method: - POST
 * req:{}
 * res:{}
 */

controller.create = async (req, res, next) => {
  try {
    const result = await userService.create(req.body);
    return responseTransformer(res, result, "New User Created", true);
  } catch (error) {
    return responseTransformer(res, error, "Failed to Create New User", false);
  }
};

/** updating user data for provided id
 * EndPoint:- /users/:id
 * HTTP Method: - PUT
 * req:{}
 * res:{}
 */

controller.update = async (req, res, next) => {
  try {
    const result = await userService.update(req.body, req.params.id);
    if (result) {
      return responseTransformer(res, result, "User Details Updated", true);
    }
    throw new Error("Can-not Find User With This id");
  } catch (error) {
    responseTransformer(res, error, "Failed To Update User", false);
  }
};

/** deleting user with provide id
 * This is for delete record from db
 * EndPoint:- /users/:id
 * HTTP Method: - DELETE
 * req:{}
 * res:{}
 */

controller.destroy = async (req, res, next) => {
  try {
    const result = await userService.destroy(req.params.id);
    if (result) {
      return responseTransformer(res, result, "User Deleted", true);
    }
    throw new Error("Can-not Find User With This id");
  } catch (error) {
    responseTransformer(res, error, "Failed To Delete User", false);
  }
};


module.exports = controller;
