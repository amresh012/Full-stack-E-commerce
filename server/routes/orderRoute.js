const express = require("express");

const {
  authMiddleware,
  isAdmin,
  isSuper,
} = require("../middlewares/authMiddleware");
const { getAllOrders,deleteOrder ,getInvoices} = require("../controller/orderCtrl");

const router = express.Router();
router.get("/", getAllOrders); 
router.delete("/:id", deleteOrder)
router.get("/invoice",authMiddleware, getInvoices);
// router.get("/admin",authMiddleware,isAdmin, getAdminProduct);
// router.put("/",authMiddleware,isAdmin, editOrderStatus);
module.exports = router;
