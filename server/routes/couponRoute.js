const express = require("express");

const {
  authMiddleware,
  isAdmin,
} = require("../middlewares/authMiddleware");
const {CreateCopoun, ApplyCopoun, ValidateCopoun ,getCoupons ,deleteCoupon ,updateCoupon ,getCouponById} =  require("../controller/counponCtrl")

const router = express.Router();
router.get("/", getCoupons);
router.get("/admin",authMiddleware,isAdmin, getCoupons);
router.get("/:id", getCouponById);
router.post("/create",authMiddleware , isAdmin, CreateCopoun);
router.put("/",isAdmin, updateCoupon);
router.delete("/:_id",authMiddleware,isAdmin,deleteCoupon)


router.post('/validate', ValidateCopoun);        // Validate a coupon
router.post('/apply', ApplyCopoun);              // Apply a coupon

module.exports = router;
