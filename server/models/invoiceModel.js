const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceNo: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
  invoice:{
    type:String
  },
  orderby:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  total: {
    type: String,
    required: true,
  },
});

const OTP = mongoose.model('invoice', invoiceSchema);

module.exports = OTP;



