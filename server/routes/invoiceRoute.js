const express = require("express");
const {
    authMiddleware,
    isAdmin,
  } = require("../middlewares/authMiddleware");
  const {createInvoice, fetchbyid} = require("../controller/invoiceCtrl")
 
  const router = express.Router();
  router.post("/create", authMiddleware, createInvoice)
  router.get("/getbyid",fetchbyid)

  module.exports = router;
