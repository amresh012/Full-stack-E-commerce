// routes/coupon.js
const express = require('express');
const router = express.Router();
const Coupon = require("../models/discountModel");
const { generateCouponCode, calculateExpiryDate } = require('../utils/couponUtils');



// Create a new coupon

// Create a new coupon with generated code and expiry date
const CreateCopoun = async (req, res) => {
  try {
    const { discountType, discountValue, usageLimit, daysValid } = req.body;

    // Generate the coupon code and expiry date
    const code = generateCouponCode();
    const expiryDate = calculateExpiryDate(daysValid);

    const newCoupon = new Coupon({
      code,
      discountType,
      discountValue,
      expiryDate,
      usageLimit,
    });

    await newCoupon.save();
    res.status(201).json({ message: 'Coupon created successfully', coupon: newCoupon });
  } catch (error) {
     
    res.status(500).json({ error: 'Failed To Create Copoun Something Went Wrong' });
  }
};

// Validate a coupon
const ValidateCopoun = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code });
    if (!coupon || !coupon.isActive || coupon.expiryDate < new Date() || coupon.usageCount >= coupon.usageLimit) {
      return res.status(400).json({ error: 'Invalid or expired coupon' });
    }
    res.status(200).json({ coupon });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update coupon usage
const ApplyCopoun = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({ code });
    if (coupon && coupon.isActive && coupon.expiryDate >= new Date() && coupon.usageCount < coupon.usageLimit) {
      coupon.usageCount += 1;
      await coupon.save();
      res.status(200).json({ message: 'Coupon applied successfully' });
    } else {
      res.status(400).json({ error: 'Invalid or expired coupon' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get all coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json(coupons);
  } catch (error) {
    
    res.status(500).json({ error });
  }
};

// Get a single coupon by ID
const getCouponById = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findById(id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Update a coupon
const updateCoupon = async (req, res) => {
  console.log(req.body)
  try {
    const { id } = req.params;
    const { discountType, discountValue, expiryDate, usageLimit } = req.body;
    const coupon = await Coupon.findByIdAndUpdate(
      id,
      {discountType, discountValue, expiryDate, usageLimit },
      { new: true }
    );
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon updated successfully', coupon });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Delete a coupon
const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const coupon = await Coupon.findByIdAndDelete(id);
    if (!coupon) {
      return res.status(404).json({ error: 'Coupon not found' });
    }
    res.status(200).json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
  CreateCopoun,
  ValidateCopoun ,
   ApplyCopoun ,
   getCoupons
    ,deleteCoupon ,
    updateCoupon ,
    getCouponById};
