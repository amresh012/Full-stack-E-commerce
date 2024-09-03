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
      amount : amount*100,
      cartItems,
      address,
      userId,
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
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const key_secret = process.env.RAZORPAY_SECRET_KEY;

  const generated_signature = crypto.createHmac('sha256', key_secret)
                                     .update(razorpay_order_id + "|" + razorpay_payment_id)
                                     .digest('hex');

  if (generated_signature === razorpay_signature) {
      // Payment is verified, save to database
      res.send("Payment verified successfully");
  } else {
      res.status(400).send("Invalid payment verification");
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
