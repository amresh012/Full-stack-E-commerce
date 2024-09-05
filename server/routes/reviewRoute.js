// routes/reviewRoutes.js
const express = require("express");
const {
  createReview,
  getProductReviews,
  updateReview,
  deleteReview,
} = require("../controller/reviewCtrl");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, createReview);

router.get("/:productId", getProductReviews);

router.put("/:id", authMiddleware, updateReview);

router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
