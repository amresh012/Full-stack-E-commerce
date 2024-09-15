const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {title:
    {
    type: String,
      required:[true,"review title is required"]
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1, // Minimum rating of 1
      max: 5, // Maximum rating of 5
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer value",
      },
    },
    review: {
      type: String,
      required: true,
      maxlength: 1000, // Limit the review text to 1000 characters
    },
    // likes: {
    //   type: Number,
    //   default: 0,
    // },
    // helpfulVotes: [
    //   {
    //     user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    //     vote: { type: Boolean }, // true if helpful, false if not
    //   },
    // ],
    reviewDate: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Middleware to update `updatedAt` before saving
reviewSchema.pre("save", function (next) {
  if (this.isModified("review") || this.isModified("rating")) {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model("review", reviewSchema);
