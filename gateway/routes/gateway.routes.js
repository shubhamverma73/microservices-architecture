const express = require("express");
const {
  forwardToUsers,
  forwardToProducts,
  forwardToOrders
} = require("../controllers/gateway.controller");

const router = express.Router();

// The client calls /api/users, but the User Service expects /users.
// The controller removes /api before forwarding the request.
router.all("/users", forwardToUsers);
router.all("/users/:id", forwardToUsers);

router.all("/products", forwardToProducts);
router.all("/products/:id", forwardToProducts);

router.all("/orders", forwardToOrders);
router.all("/orders/:id", forwardToOrders);

module.exports = router;
