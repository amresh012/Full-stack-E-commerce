const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        // 
        next();
      }
    } catch (error) {
      res.json({ error: "Not Authorized token expired, Please Login again" });
    }
  } else {
    res.json({ error: "There is no token attached to header" });
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email });

  if (adminUser.role !== "admin") {
    res.json({ error: "You are not an admin" });
  } else {
    req.user = req.user;
    next();
  }
});

const checkAccess = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const user = await User.findOne({ email });
  // const route = req.originalUrl.split("/")[2];
  // console.log(route);
  // if (user.role === "admin" || (user.role === 'Employee' && user.allowedRoutes.includes(''))) {
  if (user.role === "admin" || user.role === 'Employee') {
    req.user = req.user;
    next();
  } else {
    res.json({ error: "You are not authorized to access this route." });
  }
});

const isSuper = asyncHandler(async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email });
  if (adminUser.super === true) {
    req.user = req.user;
    next();
  } else {
    res.json("You are not Super admin");
  }
});

module.exports = { authMiddleware, isAdmin, isSuper, checkAccess };
