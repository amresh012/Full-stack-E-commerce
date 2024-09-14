const express = require("express");
const {
    authMiddleware,
    isAdmin,
  } = require("../middlewares/authMiddleware");
  const {createInvoice, getInvoiceById} = require("../controller/invoiceCtrl")
 
  const router = express.Router();
  router.post("/create", authMiddleware, createInvoice)
  router.get("/getbyid/:id",getInvoiceById)

  module.exports = router;
