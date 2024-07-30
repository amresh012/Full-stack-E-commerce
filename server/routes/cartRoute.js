const express = require("express");
const {
  getcart,
  addItemToCart,
  removeAnItem,
  updatecart,
} = require("../controller/cartCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/", authMiddleware, getcart);
router.post("/", authMiddleware, addItemToCart);
router.put("/", authMiddleware, updatecart);
router.delete("/:id", authMiddleware, removeAnItem);

module.exports = router;
