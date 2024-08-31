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
          createdAt: 1,
        },
      },
      {
        $match: {
          createdAt: date,
        },
      },
    ]);

    const totalProducts = await productModel.find().countDocuments();

    const totalCategories = await productModel.distinct("category");
    
    const totalPaymentsToday = 0;
    const totalPaymentsAllTime = 0;
    
    // console.log("NEW CUSTOMERS", totalNewCustomers);
    // console.log("Total Orders", totalOrders);
    // console.log("Total Products", totalProducts);
    // console.log("Total Categories", totalCategories);
    
    const recentOrders = await orderModel.find().sort({ createdAt: -1 }).limit(5);
    
    const ordersSummary = [];
    
    const customersSummary = await userModel.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $match: {
          month: date.getMonth() + 1,
          year: date.getFullYear()
        },
      },
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

    // console.log("Recent Orders", recentOrders);
    // console.log("Orders Summary", ordersSummary);
    // console.log("Customers Summary", customersSummary);
    // console.log("Categories Summary", categoriesSummary);

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
    console.log(error);
    res.status(400).send(error);
  }
});

// const getAdminData = asyncHandle(async (req, res) => {
//   try {
//     const users = await User.find();
//     const products = await Products.find();
//     const contacts = (await Contact.find()).reverse();
//     const bulks = (await Bulk.find()).reverse();
//     const invoices = (await Invoices.find()).reverse();
//     const codes = (await CouponCodes.find()).reverse();
//     const orders = await Order.find().populate([
//       {
//         path: "products.product",
//         model: "product",
//       },
//     ]);
//     const orderArr = (
//       await Promise.all(
//         orders?.map(async (order) => {
//           const user = await User.findById(order.orderby);
//           const address = user?.address?.find(
//             (adr) => JSON.stringify(adr._id) == JSON.stringify(order.address)
//           );

//           return {
//             invoiceno: order.invoiceNo,
//             products: order.products.map((productDetail) => ({
//               name: productDetail?.product?.name,
//               count: productDetail?.count,
//               total: productDetail?.total,
//             })),
//             total: order.total,
//             orderBy: address?.name,
//             mobile: address?.mobile,
//             address: address
//               ? `${address?.adr}-${address?.city}-${address?.state}-${address?.pincode}`
//               : null,
//             status: order.status,
//           };
//         })
//       )
//     ).reverse();

//     res.json({
//       users: users.reverse(),
//       products,
//       contacts,
//       bulks,
//       orders: orderArr,
//       invoices,
//       codes,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).send(error);
//   }
// });

module.exports = { getAdminData };
