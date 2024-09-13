const express = require("express");
const {
    authMiddleware,
    isAdmin,
  } = require("../middlewares/authMiddleware");
  const {createInvoice, FetchInvoiceById} = require("../controller/invoiceCtrl")
 
  const router = express.Router();
  router.post("/create", authMiddleware, createInvoice)
  router.get("/getbyid", function(){
    console.log("csdvsdfv")
    return
  })

  module.exports = router;
