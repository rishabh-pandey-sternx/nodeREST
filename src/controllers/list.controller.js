const listService = require("../services/db/list");

const { verifyToken, getToken } = require("../utils/jwt");

const { validateCreateAndUpdate } = require("../validators/list");

const responseTransformer = require("../middlewares/transformResponse");

const controller = {};

/** getting list data based on the id
 * EndPoint:- /lists/:id
 * HTTP Method: - GET
 * res:{}
 */

controller.getOne = async (req, res, next) => {
  try {
    const result = await listService.getOneById(req.params.id);

    if (result) {
      return responseTransformer(res, result, "List Details", true);
    }
    throw new Error("Can-not Find List With This id");
  } catch (error) {
    return responseTransformer(res, error, "Failed to Fetch List", false);
  }
};

/** getting my list data based on the token
 * EndPoint:- /list
 * HTTP Method: - GET
 * res:{}
 */

controller.myList = async (req, res, next) => {
  const jwtToken = getToken(req);
  const user = verifyToken(jwtToken);

  try {
    const userData = await listService.getListByUserId(user.email.toLowerCase());

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

/** getting all list data
 * EndPoint:- /lists
 * HTTP Method: - GET
 * res:{}
 * Query Params : filter, limit, pageNo, query
 * Endpoint With Query Params:- /lists?filter=active&limit=10
 */

controller.getAll = async (req, res, next) => {
  try {
    const result = await listService.getAll(req.query);

    return responseTransformer(res, result, "All records for lists", true);
  } catch (error) {
    return responseTransformer(res, error, "Failed to Load All lists", false);
  }
};

/** creating new list with provide data
 * EndPoint:- /lists
 * HTTP Method: - POST
 * req:{}
 * res:{}
 */

controller.create = async (req, res, next) => {
  // const validate = validateCreateAndUpdate(req);
  // if (validate.length) {
  //   return responseTransformer(
  //     res,
  //     validate,
  //     "Schema Validation Failed",
  //     false
  //   );
  // }

  try {
    const result = await listService.create(req.body);

    return responseTransformer(res, result, "New list Created", true);
  } catch (error) {
    return responseTransformer(res, error, "Failed to Create New list", false);
  }
};

/** updating list data for provided id
 * EndPoint:- /lists/:id
 * HTTP Method: - PUT
 * req:{}
 * res:{}
 */

controller.update = async (req, res, next) => {
  // const validate = validateCreateAndUpdate(req);
  // if (validate.length) {
  //   return responseTransformer(
  //     res,
  //     validate,
  //     "Schema Validation Failed",
  //     false
  //   );
  // }

  try {
    const result = await listService.update(req.body, req.params.id);
    if (result && result[0]) {
      return responseTransformer(res, result, "List Details Updated", true);
    }
    throw new Error("Can-not Find list With This id");
  } catch (error) {
    responseTransformer(res, error, "Failed To Update list", false);
  }
};

/** deleting list with provide id
 * This is just a soft delete setting active and deleted_at field in db
 * EndPoint:- /lists/:id
 * HTTP Method: - DELETE
 * req:{}
 * res:{}
 */

controller.destroy = async (req, res, next) => {
  try {
    const result = await listService.destroy(req.params.id);
    if (result && result[0]) {
      return responseTransformer(res, result, "List Deleted", true);
    }
    throw new Error("Can-not Find List With This id");
  } catch (error) {
    responseTransformer(res, error, "Failed To Delete List", false);
  }
};


module.exports = controller;
