const express = require("express");

const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createOrder } = require("../controller/shiprocketctrl");
const router = express.Router();

router.post("/", createOrder );

module.exports = router;
