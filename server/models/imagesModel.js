const mongoose = require("mongoose");

const imageModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },

}, { timestamps: true });

const Coupon = mongoose.model("images", imageModel);

module.exports = Coupon;
