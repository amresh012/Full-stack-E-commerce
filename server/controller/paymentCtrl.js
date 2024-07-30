const axios = require("axios");
const crypto = require("crypto");
const CouponCode = require("../models/discountModel");
const User = require("../models/userModel");
require("dotenv").config();

function generateId() {
  const timestamp = new Date().getTime();
  const randomId = Math.floor(Math.random() * 1000000);
  const uniqueTransactionId = `MT${timestamp}${randomId}`;
  return uniqueTransactionId;
}

const initializePayment = async (req, res) => {
  const apiKey = process.env.PHONE_PAY_API_KEY;
  const detail = Buffer.from(
    JSON.stringify({
      userid: req.body.userid,
      productid: req.body.productid,
      amount: parseInt(req.body.amount),
      address: req.body.address,
    })
  ).toString("base64");
  const obj = {
    merchantId: process.env.PHONE_PAY_MERCHANT_ID,
    merchantUserId: "MU8510051511",
    merchantTransactionId: generateId(),
    amount: parseInt(req.body.amount) * 100,
    // redirectUrl: `http://127.0.0.1:8000/api/payment/check?detail=${detail}`,
    redirectUrl: `https://eccomerce1.deepmart.shop/api/payment/check?detail=${detail}`,
    redirectMode: "POST",
    callbackUrl: `https://eccomerce1.deepmart.shop/api/payment/check`,
    mobileNumber: "8510051511",
    paymentInstrument: {
      type: "PAY_PAGE",
    },
  };
  const jsonString = JSON.stringify(obj);

  const request = Buffer.from(jsonString).toString("base64");
  const shaVal = await crypto
    .createHash("sha256")
    .update(`${request}/pg/v1/pay${apiKey}`)
    .digest("hex");
  const checkSum = `${shaVal}###1`;

  const options = {
    method: "POST",
    url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checkSum,
    },
    data: {
      request,
    },
  };
  try {
    const response = await axios.request(options);
    const url = response.data.data.instrumentResponse.redirectInfo.url;
    res.redirect(url);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.response.data);
  }
};

const checkPaymentStatus = async (req, res, next) => {
  const { code } = req.body;
  const { detail } = req.query;
  const Details = JSON.parse(Buffer.from(detail, "base64").toString("utf-8"));
  req.body = { ...Details, ...req.body };
  if (code == "PAYMENT_SUCCESS") {
    next();
  } else {
    res.redirect(`https://eccomerce1.deepmart.shop/users/orders/fail`);
  }
};

const applyCode = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const coupon = await CouponCode.findOne({ code: req.body.code });
  if(user.cart.isCouponApplied?.code){
    return res.status(500).send("You already applied a coupon!")
  }

  if (coupon) {
    let discountValue;
    if (coupon.type == "Percentage") {
      discountValue =
        (user.cart.totalValue / 100) * coupon.discountValue;
    } else {
      discountValue = coupon.discountValue;
    }
    user.cart.totalValue = user.cart.totalValue-discountValue;
    user.cart.isCouponApplied = {
      code: coupon.code,
      discountValue: discountValue,
    };
    await user.save();
    res.send(user.cart);
  } else {
    res.status(500).send("The coupon code is invalid!");
  }
};

module.exports = { initializePayment, checkPaymentStatus, applyCode };
