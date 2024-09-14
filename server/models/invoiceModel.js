const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  invoiceId:{
    type:String,
    required:true,
    unique:true
  },
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }],
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



