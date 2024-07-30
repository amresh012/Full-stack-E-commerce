const asyncHandle = require("express-async-handler");
const Products = require("../models/productModel");
const User = require("../models/userModel");
const Contact = require("../models/contactUsModel");
const Bulk = require("../models/bulkModel");
const Order = require("../models/orderModel");
const Invoices = require("../models/invoiceModel");
const CouponCodes = require("../models/discountModel");

const getAdminData = asyncHandle(async (req, res) => {
  try {
    const users = await User.find();
    const products = await Products.find();
    const contacts = (await Contact.find()).reverse();
    const bulks = (await Bulk.find()).reverse();
    const invoices = (await Invoices.find()).reverse();
    const codes = (await CouponCodes.find()).reverse();
    const orders = await Order.find().populate([
      {
        path: "products.product",
        model: "product",
      },
    ]);
    const orderArr = (
      await Promise.all(
        orders?.map(async (order) => {
          const user = await User.findById(order.orderby);
          const address = user?.address?.find(
            (adr) => JSON.stringify(adr._id) == JSON.stringify(order.address)
          );

          return {
            invoiceno: order.invoiceNo,
            products: order.products.map((productDetail) => ({
              name: productDetail?.product?.name,
              count: productDetail?.count,
              total: productDetail?.total,
            })),
            total: order.total,
            orderBy: address?.name,
            mobile: address?.mobile,
            address: address
              ? `${address?.adr}-${address?.city}-${address?.state}-${address?.pincode}`
              : null,
            status: order.status,
          };
        })
      )
    ).reverse();

    res.json({
      users: users.reverse(),
      products,
      contacts,
      bulks,
      orders: orderArr,
      invoices,
      codes,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

module.exports = { getAdminData };
