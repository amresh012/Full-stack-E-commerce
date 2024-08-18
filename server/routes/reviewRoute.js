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

// Route to create a review
router.post("/", authMiddleware, createReview);

// Route to get all reviews for a product
router.get("/:productId", getProductReviews);

// Route to update a review
router.put("/:id", authMiddleware, updateReview);

// Route to delete a review
router.delete("/:id", authMiddleware, deleteReview);

module.exports = router;
