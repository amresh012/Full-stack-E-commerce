const mongoose = require("mongoose");
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
      type: String,
      unique :true
    },
    hsnCode: {
      type: String,
      unique :true
    },
    perpiece: {
      type: String,
    },
    measurment: {
      type: String,
    }, 
    length:{
      type:Number,
      required:true
    },
    width:{
      type:Number,
      required:true
    },
    height :{
      type:Number,
      required:true
    },
    weight :{
      type:Number,
      required:true
    },
    reviews:{
      type:[mongoose.Schema.Types.ObjectId],
      ref: 'reviews'
    },
    rating: {
      type: Number,
      default: 0,
    },
    NumberOfReview: {
      type: Number,
      default:0
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
