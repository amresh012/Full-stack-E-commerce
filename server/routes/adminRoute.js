const express = require("express");
const { getAdminData } = require("../controller/adminCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware,isAdmin, getAdminData);

module.exports = router;
