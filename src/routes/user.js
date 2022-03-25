const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getOneById,
  getAll,
  create,
  update,
  destroy
} = require("../controllers/user.controller");


// get all users
router.get("/", getAll);

// get details of a user
router.get("/:id", getOneById);

// create a user
router.post("/", create);

// update details of a user
router.put("/:id", update);

// delete a user
router.delete("/:id", destroy);

module.exports = router;
