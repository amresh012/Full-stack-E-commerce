// controllers/reviewController.js
const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

// Create a review
const createReview = async (req, res) => {
  try {
    const { productId, title, rating, comment } = req.body;

    // Ensure product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const review = new Review({
      product: productId,
      user: req.user._id, // Assume the authenticated user's ID is in req.user
      title,
      rating,
      comment,
    });

    await review.save();

    // Populate the user and product data after saving the review
    const populatedReview = await Review.findById(review._id)
      .populate("user", "name email")  // Populate user info
      .populate("product", "name price");  // Populate product info

    res.status(201).json(populatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// Get all reviews for a product
const getProductReviews = async (req, res) => {
  try {
    // Fetch reviews for the specified product and populate the user details
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name email") // Populate user info
      .populate("product", "name price"); // Optionally, populate product info

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update a review
const updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Ensure the review belongs to the user
    if (review.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own reviews" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;

    await review.save();

    const updatedReview = await Review.findById(review._id)
      .populate("user", "name email")  // Populate user info
      .populate("product", "name price");  // Populate product info

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Delete a review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("user", "name")  // Populate user info
      .populate("product", "name");  // Populate product info

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Ensure the review belongs to the user
    if (review.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own reviews" });
    }

    await review.remove();

    res.json({ message: "Review deleted successfully", review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {deleteReview,updateReview,createReview,getProductReviews}