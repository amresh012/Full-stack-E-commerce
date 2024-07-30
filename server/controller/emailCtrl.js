const asyncHandle = require("express-async-handler");
const nodemailer = require("nodemailer");
require("dotenv").config();
const sendEmail = asyncHandle(async (data) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.MAIL_ID, // generated ethereal user
      pass: process.env.MP, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "<no-reply@eccomerce1.deepmart.shop>",
    to: data.to, // list of receivers
    subject: data.subject, // Subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
});
module.exports = { sendEmail };
