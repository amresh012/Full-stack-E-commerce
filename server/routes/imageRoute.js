const express = require("express");
const { addimage, getImg, } = require("../controller/imgCtrl");
const {authMiddleware,checkAccess} = require("../middlewares/authMiddleware")


const router = express.Router();
router.get("/", getImg);
router.post("/", addimage);
router.delete("/:id", addimage);
module.exports = router;
