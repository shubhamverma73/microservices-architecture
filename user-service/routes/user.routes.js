const express = require("express");
const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require("../controllers/user.controller");
const { createUserValidator } = require("../validators/user.validator");
const validateRequest = require("../middlewares/validation.middleware");

const router = express.Router();

// Routes map HTTP methods and URLs to controller functions.
router.post("/", createUserValidator, validateRequest, createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", createUserValidator, validateRequest, updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
