const mongoose = require("mongoose"); // Erase if already required
// Declare the Schema of the Mongo model

var orderSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      require: true,
    },
    Orderid:
    {
       type:String,
       require:true
    },
    // invoiceNo: {
    //   type:mongoose.Schema.Types.ObjectId,
    //   ref:"invoice",
    //   require:true
    // },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
        },
        count: Number,
        total: Number,
      },
    ],
    total: { type: Number, require: true },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: {
      type:String,
      require:true
    },
    status: {
      type: String,
      default: "Processing",
      statuses: [
        'Not Processed', 'Cancelled', 'return Successfully', 'Dispatch', 'return',
        'Out Of Delivery', 'Order Confirmed', 'Processing', 'Shipped', 'COD'
      ]
    },
  },{
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Order", orderSchema);
