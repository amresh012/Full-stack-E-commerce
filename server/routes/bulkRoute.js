const express = require("express");
const {
  addBulk,
  getallBulk,
  deletebulk,
  updateRemarkbulk,
} = require("../controller/bulkCtrl");

const router = express.Router();
router.get("/", getallBulk);
router.post("/", addBulk);
router.put("/", updateRemarkbulk);
router.delete("/", deletebulk);
module.exports = router;
