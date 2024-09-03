const asyncHandle = require("express-async-handler");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const OTP = require("../models/otpmodel");
require("dotenv").config();

const sendOtpOnMail = asyncHandle(async (req, res) => {
  const otp = randomstring.generate({
    length: 4,
    charset: "numeric",
  });
  const html = `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">KFS FITNESS</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing KFS FITNESS. Use the following OTP to complete your to continue of submition. OTP is valid for 5 minutes only</p>
    <h2 style="background: blue;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />KFS FITNESS TEAM</p>
    <hr style="border:none;border-top:1px solid #eee" />
    
  </div>
</div>`;
  if (req.body.email) {
    const { email } = req.body;

    try {
      await OTP.create({ email, otp });
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
      let info = await transporter.sendMail({
        from: "<kfsfitnessnoreply@gmail.com>",
        to: email,
        subject: "OTP verification by KFS Fitness",
        // text: otp, // plain text body
        html: html,
      });

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.json({ success: "OTP generated and sent successfully" });
    } catch (error) {
      console.error("Error generating OTP", error);
      res.json("Failed to generate OTP");
    }
  } else {
    res.json("Please enter a valid Email");
  }
});
const verifyOtp = async (req, res) => {
  console.log(req.body)
  if (!req.body || !req.body.otp) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const { otp } = req.body;
  try {
    const otpVerify = await OTP.findOne({ otp });
    if (otpVerify) {
      return res.json({ success: "OTP Verified" });
    } else {
      return res.status(401).json({ error: "Invalid OTP" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { sendOtpOnMail, verifyOtp };
