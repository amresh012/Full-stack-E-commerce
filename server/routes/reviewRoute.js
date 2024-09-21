const express = require("express");
const { createProductReview } = require("../controller/reviewCtrl"); // Import the controller
const {authMiddleware} = require("../middlewares/authMiddleware")

const router = express.Router();

// Route to add a new review
router.post("/:productId",authMiddleware, createProductReview);

// Route to get all reviews for a product
// router.get(
  // "/products/:productId/reviews",
  // reviewController.getAllReviewsForProduct
// );

// Route to update a review
// router.put("/reviews/:reviewId", reviewController.updateReview);

// Route to delete a review
// router.delete("/reviews/:reviewId", reviewController.deleteReview);

module.exports = router;
