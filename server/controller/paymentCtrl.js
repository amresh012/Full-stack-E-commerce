const crypto =require("crypto")
const CouponCodes = require("../models/discountModel");
const User =require("../models/userModel");
const Razorpay =require("razorpay");
const orderModel = require("../models/orderModel");
const OrderController = require("../controller/orderCtrl")

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
    
    const options = {
      amount: amount *100  , // amount in the smallest currency unit
      currency: "INR",
      receipt: generateId(),
      notes:{
        "shipping_info":address
      }
    }
    // 
    const order = await razorpay.orders.create(options);
    // 
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
    
    return res.status(500).send("Failed To Create Order");
  }
};

const verifyPayment = async (req, res) => {
  const { paymentId,order_id, razorpay_signature, amount, items, address, user } = req.body;
  const key_secret = process.env.RAZORPAY_SECRET_KEY;
  // Prepare the string that needs to be signed
  const body = order_id+"|"+paymentId;
  // Generate the expected signature
  const expectedSignature = crypto
    .createHmac("sha256", key_secret)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    return res.status(200).json({
      success:true,
      message: "Payment Verification is successful",

    })
  } else {
    return res.status(400).json({
      success:false,
      message: "Payment verification failed",
    });
  }
};

const applyCode = async (req, res, next) => {
  try {
    // Ensure coupon code exists in the request body
    const { code } = req.body;
    if (!code) {
      return res.status(400).send("Coupon code is required.");
    }

    // Fetch the user by ID and populate their cart details if necessary
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Check if a coupon is already applied
    if (user.cart.isCouponApplied?.code) {
      return res.status(400).send("You have already applied a coupon.");
    }

    // Find the coupon by code
    const coupon = await CouponCodes.findOne({ code });
    if (!coupon) {
      return res.status(400).send("Invalid coupon code.");
    }

    // Calculate the discount value based on the coupon type (percentage or fixed amount)
    let discountValue = 0;
    if (coupon.type === "percentage") {
      discountValue = (user.cart.totalValue * coupon.discountValue) / 100;
    } else {
      discountValue = coupon.discountValue;
    }
  console.log(discountValue)
    // Ensure the totalValue doesn't go negative after applying the discount
    const newTotalValue = user.cart.totalValue - discountValue;
    console.log(newTotalValue)
    if (newTotalValue < 0) {
      return res.status(400).send("Discount exceeds the cart total value.");
    }

    // Apply the coupon to the user's cart
    user.cart.totalValue = newTotalValue;
    user.cart.isCouponApplied = {
      code: coupon.code,
      discountValue: discountValue,
    };

    // Save the updated user cart
    await user.save();

    // Send the updated cart back to the client
    res.status(200).json({
      message: "Coupon applied successfully!",
      cart: user.cart,
    });
  } catch (error) {
    // Handle unexpected server errors
    console.error("Error applying coupon:", error);
    res.status(500).send("An error occurred while applying the coupon.");
  }
};


module.exports={
  createOrder,
  verifyPayment,
  applyCode
}
