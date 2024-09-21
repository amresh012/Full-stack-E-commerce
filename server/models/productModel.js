const mongoose = require("mongoose");


const reviewSchema = mongoose.Schema(
  {
    // name: { type: String, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", //relation betwen the review and the user
    },
  },
  {
    timestamps: true,
  }
);

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    sku: {
      type: String,
      require: [true, "sku Code not generated unable to add producut"],
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    itemCode: {
      type: Number,
      unique: true,
    },
    hsnCode: {
      type: Number,
      unique: true,
    },
    perpiece: {
      type: String,
    },
    measurment: {
      type: String,
    },
    length: {
      type: Number,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    quantity: {
      type: Number,
    },
    corporateDiscount: {
      type: String,
      validate: {
        validator: function (value) {
          return (
            /^\d+(\.\d+)?$/.test(value) &&
            parseFloat(value) >= 0 &&
            parseFloat(value) <= 100
          );
        },
        message: (props) =>
          `${props.value} is not a valid discount percentage.`,
      },
    },
    mindiscription: {
      type: String,
    },
    datasheet: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("product", ProductSchema);
