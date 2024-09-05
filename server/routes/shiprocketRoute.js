const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createOrder } = require("../controller/shiprocketctrl");
const shiprocketController = require('../controller/ShippingCalaulator');
const router = express.Router();

router.post("/",authMiddleware , createOrder );
router.post('/shiprocket-rate-calculation', shiprocketController.shiprocketRateCalculation);

module.exports = router;
