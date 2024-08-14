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
    },
    hsnCode: {
      type: String,
    },
    perpiece: {
      type: String,
    },
    meausrement: {
      type: String,
    }, 
    rating:{
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    },
    quantity: {
      type: Number,
    },
    individualdiscount: {
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

function capitalizeFirstLetter(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

ProductSchema.pre('save', function (next) {
  if (this.category) {
    this.category = capitalizeFirstLetter(this.category);
  }
  if (this.subcategory) {
    this.subcategory = capitalizeFirstLetter(this.subcategory);
  }
  next();
});

module.exports = mongoose.model("product", ProductSchema);
