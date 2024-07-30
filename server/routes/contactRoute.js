const express = require("express");
const {
  addContactus,
  getallContactUs,
  deleteContact,
  updateRemarkContact,
} = require("../controller/contactusCtrl");

const router = express.Router();
router.get("/", getallContactUs);
router.post("/", addContactus);
router.put("/", updateRemarkContact);
router.delete("/", deleteContact);
module.exports = router;
