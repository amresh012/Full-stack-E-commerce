const axios = require("axios");
const ccav = require("./ccavutil.js");
const qs = require("querystring");
require("dotenv").config();

exports.postReq = async function (request, response) {
  const workingKey = process.env.WORKING_KEY;
  const accessCode = process.env.ACCESS_CODE;

  try {
    // Parse JSON from the request body
    const data = {
      currency: "INR",
      merchant_id: "2948076",
      order_id: "93587658",
      amount: "1.00",
      redirect_url: "http://192.168.1.3:7006/ccavResponseHandler",
      cancel_url: "http://127.0.0.1:7006/ccavResponseHandler",
      language: "EN",
      billing_name: "Peter",
      billing_address: "Santacruz",
      billing_city: "Mumbai",
      billing_state: "MH",
      billing_zip: "400054",
      billing_country: "India",
      billing_tel: "9876543210",
      billing_email: "testing@domain.com",
      delivery_name: "Sam",
      delivery_address: "Vile Parle",
      delivery_city: "Mumbai",
      delivery_state: "Maharashtra",
      delivery_zip: "400038",
      delivery_country: "India",
      delivery_tel: "0123456789",
    };
    const requestData = JSON.stringify(data);

    // Encrypt the request data
    const encRequest = ccav.encrypt(requestData, workingKey);
    console.log(encRequest)

    // Prepare form body
    const formBody = {
      encRequest: encRequest,
      access_code: accessCode,
    };

    // Use axios to make a POST request to CCAvenue
    const ccAvenueResponse = await axios.post(
      "https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction",
      qs.stringify(formBody)
    );
    https: response.status(ccAvenueResponse.status).send(ccAvenueResponse.data);
  } catch (error) {
    console.error("Error:", error.message);
    response.status(500).send("Internal Server Error");
  }
};
