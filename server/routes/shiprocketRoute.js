const express = require("express");

const { authMiddleware } = require("../middlewares/authMiddleware");
const { createOrder } = require("../controller/shiprocketctrl");
const shiprocketController = require('../controller/ShippingCalaulator');
const router = express.Router();

router.post("/",authMiddleware , createOrder );
router.post('/shiprocket-rate-calculation',authMiddleware, shiprocketController.shiprocketRateCalculation);

module.exports = router;
