const express = require("express");
const { addimage, getImg, } = require("../controller/imgCtrl");


const router = express.Router();
router.get("/", getImg);
router.post("/", addimage);
module.exports = router;
