const express = require("express");
const reviewController = require("../controller/reviewCtrl"); // Import the controller

const router = express.Router();

// Route to add a new review
router.post("/products/:productId/reviews", reviewController.addReview);

// Route to get all reviews for a product
router.get(
  "/products/:productId/reviews",
  reviewController.getAllReviewsForProduct
);

// Route to update a review
router.put("/reviews/:reviewId", reviewController.updateReview);

// Route to delete a review
router.delete("/reviews/:reviewId", reviewController.deleteReview);

module.exports = router;
