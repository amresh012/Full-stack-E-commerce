const Product = require("../models/productModel");
const Adress = require("../models/AddressModel");
const axios = require("axios");
const User = require("../models/userModel");

const createOrder = async (req, res) => {
  const useremail = req.body.email;
  const userD = await User.find({ email: useremail });
  const user = userD[0];

  // Extracted id from body
  const productids = req.body.productinfo.split(" ");
  const extractedIds = [];
  for (let i = 0; i < productids.length; i++) {
    const word = productids[i].trim(); // Remove any leading/trailing spaces from the word
    if (word.length === 24) {
      extractedIds.push(word);
    }
  }
  // Getting product details
  const productDetail = [];
  for (let i = 0; i < extractedIds.length; i++) {
    const element = await Product.find({ _id: extractedIds[i] });
    const product = element[0];
    let pro = {
      name: product.title,
      sku: product.slug,
      units: 1,
      length:product.length,
      width: product.width,
      height: product.height,
      weight:product.weight,
      selling_price: product.price,
      discount: product.Discount,
    };
    productDetail.push(pro);
  }
  // getting user adress
  const n = user.address.length - 1
  const addid = user.address[n];
  const adr = await Adress.findOne({ _id: addid });
  function generateSixDigitRandomNumber() {
    // Generate a random number between 100000 and 999999 (both inclusive)
    const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    return randomNumber;
  }
  
  const orderid = generateSixDigitRandomNumber();
  const amount = req.body.amount;
  const shiprocket = {
    order_id: orderid.toString(),
    order_date: "2024-07-24 11:11",
    pickup_location: "Primary",
    billing_customer_name: user.firstname,
    billing_last_name: user.lastname,
    billing_address: adr.address,
    billing_city: adr.city,
    billing_pincode: adr.zipcode,
    billing_state: adr.state,
    billing_country: "India",
    billing_email: useremail,
    billing_phone: user.mobile,
    shipping_is_billing: true,
    order_items: productDetail,
    payment_method: "Prepaid",
    transaction_charges: 0,
    total_discount: 0,
    sub_total: amount,
    length: 10,
    breadth: 15,
    height: 20,
    weight: 2.5,
  };
   console.log(shiprocket)
  const headersConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.SHIP_ROCKET_TOKEN,
    },
  };
  try {
    const resp = await axios.post(
      "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      shiprocket,
      headersConfig
    );
  
    if (resp.data.error) {
      res.status(500).send({ message:resp.data.error });
    } else {
      console.log("hi after shiprocket")
      makepdf(useremail)
      res.json({success:true,shippting:resp.data});
    }
  } catch (error) {
    const shiprocketerr = error.response?.data?.errors
    if(shiprocketerr){
      console.error("Error making API request:", shiprocketerr);
      res.status(500).send(shiprocketerr);
    }
    else{
      res.status(500).send(error);
    }
  }

  res.json(shiprocket);
};

module.exports = {
  createOrder,
};
