const mongoose = require("mongoose");
const contactusShema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
      unique:true
    },
    reason:{
      type: String,
      required: true,
    },
    customReason:{
      type: String,
    },
    remarks: {
      type: String,
      default: "No Remarks",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contactus", contactusShema);
