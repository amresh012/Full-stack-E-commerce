const express = require ("express")
const router = express.Router()
const {authMiddleware} = require("../middlewares/authMiddleware")

const {createOrder, verifyPayments ,applyCode}  = require("../controller/paymentCtrl")

router.post("/createOrder" ,authMiddleware, createOrder)
router.post("/verifyPayments" , verifyPayments)
router.post("/couponcode", authMiddleware ,applyCode);

module.exports = router;


