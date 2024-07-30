const asyncHandle = require("express-async-handler");
const Coupon = require("../models/discountModel");

const addcoupon = asyncHandle(async (req, res) => {
  console.log(req.body);
  try {
    await Coupon.create(req.body);
    const resp = {
      success: "Coupon is created sucessfully",
    };
    res.json(resp);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const getCoupon = asyncHandle(async (req, res) => {
  const test = await Coupon.find();
  res.json(test);
});

const deleteCoupon = asyncHandle(async (req, res) => {
  const { _id } = req.params;
  if (_id) {
    try {
      await Coupon.findByIdAndDelete({ _id });
      res.json("Deleted Sucessfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
  } else  res.status(500).send("invalid Operation");
});

const updateCoupon = asyncHandle(async (req, res) => {
  if (req.body._id) {
    const { _id } = req.body;
    try {
      await Coupon.findByIdAndUpdate({ _id }, req.body);
      res.json("Coupon Updated Sucessfully");
    } catch (error) {
      res.json(error.message);
    }
  } else res.json("invalid Operation");
});

module.exports = {
  addcoupon,
  getCoupon,
  deleteCoupon,
  updateCoupon,
};
