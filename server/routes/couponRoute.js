const express = require("express");

const {
  authMiddleware,
  isAdmin,
} = require("../middlewares/authMiddleware");
const {  addcoupon,
    getCoupon,
    deleteCoupon,
    updateCoupon,} = require("../controller/counponCtrl");

const router = express.Router();
router.get("/", getCoupon);
// router.get("/admin",authMiddleware,isAdmin, getCoupon);
router.post("/",authMiddleware,isAdmin, addcoupon);
router.put("/",authMiddleware,isAdmin, updateCoupon);
router.delete("/:_id",authMiddleware,isAdmin,deleteCoupon)
module.exports = router;
