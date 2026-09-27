const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");
const { productValidator } = require("../validators/product.validator");
const validateRequest = require("../middlewares/validation.middleware");

const router = express.Router();

// The Product Service exposes product-only routes.
router.post("/", productValidator, validateRequest, createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", productValidator, validateRequest, updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
