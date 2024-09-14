const asyncHandle = require("express-async-handler");
const Products = require("../models/productModel");
const User = require("../models/userModel");
const Contact = require("../models/contactUsModel");
const Bulk = require("../models/bulkModel");
const Order = require("../models/orderModel");
const Invoices = require("../models/invoiceModel");
const CouponCodes = require("../models/discountModel");
const userModel = require("../models/userModel");
const orderModel = require("../models/orderModel");
const productModel = require("../models/productModel");

const getAdminData = asyncHandle(async (req, res) => {
  try {
    const date = new Date();

    const totalNewCustomers = await userModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $match: {
          month: date.getMonth() + 1,
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const totalOrders = await orderModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          dayOfMonth: { $dayOfMonth: "$createdAt" },


        },
      },
      {
        $match: {
          month: date.getMonth()+1,
          year: date.getFullYear(),
          dayOfMonth: date.getDate()
        },
      },
      {
        $group: {
          _id: null,
          count:{
            $sum: 1
          }
        },
      },
    ]);


    const totalProducts = await productModel.find().countDocuments();

    const totalCategories = await productModel.distinct("category");
    
    const totalPaymentsToday = 0;
    const totalPaymentsAllTime = 0;
    
    
    const recentOrders = await orderModel.find().populate("users").sort({ createdAt: -1 }).limit(5);
    
    const ordersSummary = [];
    
    const customersSummary = await userModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      // {
      //   $match: {
      //     month: date.getMonth() + 1,
      //     year: date.getFullYear()
      //   },
      // },
      {
        $group: {
          _id: '$month',
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    const categoriesSummary = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: {
            $sum: 1
          }
        }
      }
    ]);
   
    res.status(200).json({
      success: true,
      totalNewCustomers: totalNewCustomers.length > 0 ? totalNewCustomers[0].count : 0,
      totalOrders: totalOrders.length > 0 ? totalOrders[0].count : 0,
      totalProducts,
      totalCategories: totalCategories.length,
      totalPaymentsToday,
      totalPaymentsAllTime,
      recentOrders,
      ordersSummary,
      customersSummary,
      categoriesSummary
    })
  } catch (error) {
    
    res.status(400).send(error);
  }
});

module.exports = { getAdminData };
