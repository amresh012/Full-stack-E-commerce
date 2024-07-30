const express = require("express");

const {
  authMiddleware,
  isAdmin,
  isSuper,
} = require("../middlewares/authMiddleware");
const { getOrders, getAdminProduct, editOrderStatus ,getInvoices} = require("../controller/orderCtrl");

const router = express.Router();
router.get("/",authMiddleware, getOrders);
router.get("/invoice",authMiddleware, getInvoices);
router.get("/admin",authMiddleware,isAdmin, getAdminProduct);
router.put("/",authMiddleware,isAdmin, editOrderStatus);
module.exports = router;
