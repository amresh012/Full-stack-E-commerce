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
    // console.log("Creating Razorpay order with options:", options);
    const order = await razorpay.orders.create(options);
    // console.log("Razorpay order created:", order);
    if (!order) {
      return res.status(500).send("Failed to create Order");
    }
   const respo =  res.json({
      orderId:order.id,
      amount : amount,
      cartItems,
      address,
      paystatus:"Created"
    });
    return respo;
      } 
  catch (err) {
    console.log(err);
    return res.status(500).send("Failed To Create Order");
  }
};

const verifyPayment = async (req, res) => {
  console.log("Received request body:", req.body);

  const { paymentId,order_id, razorpay_signature, amount, items, address, user } = req.body;
  const key_secret = process.env.RAZORPAY_SECRET_KEY;

  // Prepare the string that needs to be signed
  const body = order_id+"|"+paymentId;
  console.log("String to be signed:", body);

  // Generate the expected signature
  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(body.toString())
    .digest("hex");

  console.log("Generated signature:", expectedSignature);
  console.log("Razorpay signature received:", razorpay_signature);

  const isAuthentic = expectedSignature === razorpay_signature;
  console.log("Is the signature authentic?", isAuthentic);

  if (isAuthentic) {
    try {
      const order = new orderModel({
        orderId: order_id,
        paymentId:paymentId,
        amount: amount, // Convert amount to rupees
        cartItems:items,
        address,
        paymentStatus: "Success"
      });
      console.log("order-saved succesfully")
      await order.save();
      return res.status(200).send("Payment verified and order saved successfully");
    } catch (err) {
      console.error("Error saving order:", err);
      return res.status(500).send("Error saving order");
    }
  } else {
    return res.status(400).send("Invalid payment verification");
  }
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
  verifyPayment,
  applyCode
}
