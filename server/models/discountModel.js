const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 6,
    maxlength: 12,
  },
  type: {
    type: String,
    required: true,
    enum: ["Percentage", "Fixed"],
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Coupon = mongoose.model("coupon", couponSchema);

module.exports = Coupon;
