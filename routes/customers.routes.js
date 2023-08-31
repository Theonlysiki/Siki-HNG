const express = require("express");
const { create, findAll, findOne, update, deleteOne, deleteAll } = require("../controllers/customers.controllers");

const router = express.Router();
router.post("/", create);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", update);
router.delete("/:id", deleteOne);
router.delete("/", deleteAll);

module.exports = router;