const crypto =require("crypto")
const CouponCodes = require("../models/discountModel");
const User =require("../models/userModel");
const Razorpay =require("razorpay");
const orderModel = require("../models/orderModel");

// gernerating unique id's
function generateId() {
  const timestamp = new Date().getTime();
  const randomId = Math.floor(Math.random() * 1000000);
  const uniqueTransactionId = `MT${timestamp}${randomId}`;
  return uniqueTransactionId;
}

const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret:process.env.RAZORPAY_SECRET_KEY,
});

const createOrder = async (req, res) => {
  try {
    const {amount , cartItems , address , userId} = req.body;
    console.log(cartItems)
    const options = {
      amount: amount *100  , // amount in the smallest currency unit
      currency: "INR",
      receipt: generateId(),
      notes:{
        "shipping_info":address
      }
    }
    console.log("Creating Razorpay order with options:", options);
    const order = await razorpay.orders.create(options);
    console.log("Razorpay order created:", order);
    if (!order) {
      return res.status(500).send("Failed to create Order");
    }
   const respo =  res.json({
      orderId:order.id,
      amount : amount,
      cartItems,
      address,
      userId,
      paystatus:"Created"
    });
    console.log(respo)
    return respo;
      } 
  catch (err) {
    console.log(err);
    return res.status(500).send("Failed To Create Order");
  }
};

const verifyPayments = async (req, res) => {
  console.log("inside payment verification conrtroer")
  console.log(req.body)
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
  console.log(req.body)
  const sha = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const digest = sha.digest("hex");
  if (digest!== razorpay_signature) {
      return res.status(400).json({msg: " Transaction is not legit!"});
  }
  return res.json({msg: " Transaction is legit!", orderId: razorpay_order_id,paymentId: razorpay_payment_id});
};


async function applyCode(req, res, next) {
  const user = await User.findById(req.user._id);
  const coupon = await CouponCodes.findOne({ code: req.body.code });
  if (user.cart.isCouponApplied?.code) {
    return res.status(500).send("You already applied a coupon!");
  }

  if (coupon) {
    let discountValue;
    if (coupon.type == "percentage") {
      discountValue =
        (user.cart.totalValue / 100) * coupon.discountValue;
    } else {
      discountValue = coupon.discountValue;
    }
    user.cart.totalValue = user.cart.totalValue - discountValue;
    user.cart.isCouponApplied = {
      code: coupon.code,
      discountValue: discountValue,
    };
    await user.save();
    res.send(user.cart);
  } else {
    res.status(500).send("The coupon code is invalid!");
  }
}

module.exports={
  createOrder,
  verifyPayments,
  applyCode
}



// const axios = require("axios");
// const crypto = require("crypto");
// const CouponCode = require("../models/discountModel");
// const User = require("../models/userModel");
// require("dotenv").config();

// function generateId() {
//   const timestamp = new Date().getTime();
//   const randomId = Math.floor(Math.random() * 1000000);
//   const uniqueTransactionId = `MT${timestamp}${randomId}`;
//   return uniqueTransactionId;
// }

// const initializePayment = async (req, res) => {
//   const apiKey = process.env.PHONE_PAY_API_KEY;
//   const detail = Buffer.from(
//     JSON.stringify({
//       userid: req.body.userid,
//       productid: req.body.productid,
//       amount: parseInt(req.body.amount),
//       address: req.body.address,
//     })
//   ).toString("base64");
//   const obj = {
//     merchantId: process.env.PHONE_PAY_MERCHANT_ID,
//     merchantUserId: "MU8510051511",
//     merchantTransactionId: generateId(),
//     amount: parseInt(req.body.amount) * 100,
//     // redirectUrl: `http://127.0.0.1:8000/api/payment/check?detail=${detail}`,
//     redirectUrl: `https://eccomerce1.deepmart.shop/api/payment/check?detail=${detail}`,
//     redirectMode: "POST",
//     callbackUrl: `https://eccomerce1.deepmart.shop/api/payment/check`,
//     mobileNumber: "8510051511",
//     paymentInstrument: {
//       type: "PAY_PAGE",
//     },
//   };
//   const jsonString = JSON.stringify(obj);

//   const request = Buffer.from(jsonString).toString("base64");
//   const shaVal = await crypto
//     .createHash("sha256")
//     .update(`${request}/pg/v1/pay${apiKey}`)
//     .digest("hex");
//   const checkSum = `${shaVal}###1`;

//   const options = {
//     method: "POST",
//     url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
//     headers: {
//       accept: "application/json",
//       "Content-Type": "application/json",
//       "X-VERIFY": checkSum,
//     },
//     data: {
//       request,
//     },
//   };
//   try {
//     const response = await axios.request(options);
//     const url = response.data.data.instrumentResponse.redirectInfo.url;
//     res.redirect(url);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.response.data);
//   }
// };

// const checkPaymentStatus = async (req, res, next) => {
//   const { code } = req.body;
//   const { detail } = req.query;
//   const Details = JSON.parse(Buffer.from(detail, "base64").toString("utf-8"));
//   req.body = { ...Details, ...req.body };
//   if (code == "PAYMENT_SUCCESS") {
//     next();
//   } else {
//     res.redirect(`https://eccomerce1.deepmart.shop/users/orders/fail`);
//   }
// };

// const applyCode = async (req, res, next) => {
//   const user = await User.findById(req.user._id);
//   const coupon = await CouponCode.findOne({ code: req.body.code });
//   if(user.cart.isCouponApplied?.code){
//     return res.status(500).send("You already applied a coupon!")
//   }

//   if (coupon) {
//     let discountValue;
//     if (coupon.type == "Percentage") {
//       discountValue =
//         (user.cart.totalValue / 100) * coupon.discountValue;
//     } else {
//       discountValue = coupon.discountValue;
//     }
//     user.cart.totalValue = user.cart.totalValue-discountValue;
//     user.cart.isCouponApplied = {
//       code: coupon.code,
//       discountValue: discountValue,
//     };
//     await user.save();
//     res.send(user.cart);
//   } else {
//     res.status(500).send("The coupon code is invalid!");
//   }
// };

// module.exports = { initializePayment, checkPaymentStatus, applyCode };
