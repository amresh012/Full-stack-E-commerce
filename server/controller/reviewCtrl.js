const Product = require("../models/productModel")


const createProductReview = async (req, res) => {
  const { rating, review ,title } = req.body;
  const product = await Product.findById(req.params.id);
  if (product) {
    // If the user has already reviewed this product, throw an error
    const reviewedAlready = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (reviewedAlready) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }

      const newReview = {
      title:title,
      user: req.user._id,
      rating:rating,
      review,
    };

    // store the new review and update the rating of this product
    product.reviews.push(newReview);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, ele) => acc + ele.rating, 0) /
      product.numReviews;
    const updatedProduct = await product.save();
    if (updatedProduct) res.status(201).json({ message: "Review Added" });
  } else {
    res.status(404);
    throw new Error("Product not available");
  }
};


module.exports = { createProductReview };