const express = require("express");
const {
  addBlog,
  getallblogs,
  deleteblogs,
  updateblog,
} = require("../controller/blogctrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();
router.post("/add", addBlog);
router.get("/", getallblogs);
router.post("/del", authMiddleware, isAdmin, deleteblogs);
router.post("/update", updateblog);

module.exports = router;
