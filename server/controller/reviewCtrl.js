const Review = require("../models/reviewModel"); // Import the Review model

// Add a new review
exports.addReview = async (req, res) => {
  const { userId, productId, reviewText, rating } = req.body;

  try {
    const newReview = new Review({
      user: userId,
      product: productId,
      review: reviewText,
      rating: rating,
    });

    await newReview.save();
    return res.status(201).json({
      message: "Review added successfully!",
      review: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add review",
      error: error.message,
    });
  }
};

// Get all reviews for a specific product
exports.getAllReviewsForProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId })
      .populate("user", "name") // Populate the user's name
      .exec();

    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

// Update a review by ID
exports.updateReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId, reviewText, rating } = req.body;

  try {
    // Ensure only the user who posted the review can update it
    const review = await Review.findOne({ _id: reviewId, user: userId });

    if (!review) {
      return res.status(404).json({
        message:
          "Review not found or you don't have permission to update this review",
      });
    }

    // Update the fields
    review.review = reviewText;
    review.rating = rating;

    await review.save();

    return res.status(200).json({
      message: "Review updated successfully!",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update review",
      error: error.message,
    });
  }
};

// Delete a review by ID
exports.deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const { userId } = req.body;

  try {
    // Ensure only the user who posted the review can delete it
    const review = await Review.findOneAndDelete({
      _id: reviewId,
      user: userId,
    });

    if (!review) {
      return res.status(404).json({
        message:
          "Review not found or you don't have permission to delete this review",
      });
    }

    return res.status(200).json({
      message: "Review deleted successfully!",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete review",
      error: error.message,
    });
  }
};
