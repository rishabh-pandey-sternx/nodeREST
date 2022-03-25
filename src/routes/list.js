const express = require("express");

const router = express.Router({ mergeParams: true });
const {
  getOne,
  getAll,
  create,
  update,
  destroy
} = require("../controllers/list.controller");

// get all lists
router.get("/", getAll);

// get details of a specific list
router.get("/:id", getOne);

// create a list
router.post("/", create);

// update details of a list
router.put("/:id", update);

// delete a list
router.delete("/:id", destroy);

module.exports = router;
