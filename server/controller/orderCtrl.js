const { decode } = require("jsonwebtoken");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const InvoiceModel = require("../models/invoiceModel");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("./emailCtrl");
const invoice = require("./invoiceCtrl");
function generateId() {
  const timestamp = new Date().getTime();
  const randomDigits = Math.floor(10000000 + Math.random() * 90000000); // Random 8-digit number

  const orderId = `${timestamp}${randomDigits}`.substring(0, 8);
  return orderId;
}

const createOrder = async (req, res, next) => {
  const user = req.user;
  let address = req.body.address;
  let adr, placeofsup, gstNo;
  for (let i = 0; i < user.address.length; i++) {
    if (JSON.stringify(user.address[i]._id) == JSON.stringify(address)) {
      adr = `${user.address[i].adr} , ${user.address[i].city} , ${user.address[i].state} - ${user.address[i].pincode}`;
      placeofsup = user.address[i].city;
      gstNo = user.address[i].gstNo;
    }
  }
  let totalValue = parseInt(user.cart.totalValue);
  let isCoupon = false;
  console.log(user.cart);
  if (user.cart?.products?.length > 0) {
    if (user.cart.isCouponApplied?.code) {
      isCoupon = {
        code: user.cart.isCouponApplied.code,
        discountrs: parseInt(user.cart.isCouponApplied.discountValue),
      };
    }

    const newOrder = {
      products: user.cart.products,
      total: totalValue,
      orderby: user._id,
      address: address,
      transactionId: req.body.transactionId || generateId(),
      invoiceNo: generateId(),
    };

    const createdOrder = await Order.create(newOrder);
    const orders = await Order.find({ _id: createdOrder._id }).populate({
      path: "products.product",
      model: "product",
    });

    const orderArr = orders.map((order) => ({
      transactionId: order.transactionId,
      products: order.products.map((product) => {
        return {
          name: product.product.name,
          image: product.product.images[0],
          count: product.count,
          total: product.total,
          price: product.product.total,
          hsn: product.product.hsnCode,
          unit: product.product.unitMeausrement,
        };
      }),
      total: order.total,
      status: order.status,
    }));

    const detail = {
      invoiceno: newOrder.invoiceNo,
      userName: req.user.name,
      userAdress: adr,
      totalPrice: totalValue,
      productDetails: orderArr[0].products,
      isCoupon,
      placeofsup,
      gstNo: gstNo,
    };
    const invoiced = {
      invoiceNo: newOrder.invoiceNo,
      products: orderArr[0].products,
      invoice: invoice(detail),
      total: orderArr[0].total,
      orderby: req.user._id,
    };
    await InvoiceModel.create(invoiced);
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $set: {
          "cart.products": [],
          "cart.totalValue": 0,
          "cart.isCouponApplied": {},
        },
      },
      { new: true }
    );
    res.redirect(`https://eccomerce1.deepmart.shop/users/orders/success`);
    // res.redirect(`http://localhost:3001/users/orders/success`);
    // const data = {
    //   to: "khuswahapankaj00@gmail.com",
    //   subject: "Invoice Details",
    //   html: invoice(detail),
    // };
    // sendEmail(data)
  } else {
    res.status(500).send({ error: "No product found in user cart" });
  }
};

const checkUser = async (req, res, next) => {
  let token = req.body.userid;
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded?.id);
      req.user = user;
      next();
    }
  } catch (error) {
    res.json({ error: "Not Authorized token expired, Please Login again" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ orderby: req.user._id }).populate({
      path: "products.product",
      model: "product",
    });

    const orderArr = orders.map((order) => ({
      transactionId: order.transactionId,
      products: order.products.map((product) => ({
        name: product.product.name,
        id: product.product._id,
        image: product.product.images[0],
        category: product.product.category,
        count: product.count,
        total: product.total,
      })),
      total: order.total,
      status: order.status,
      address: order.address,
    }));

    res.send(orderArr);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await InvoiceModel.find({ orderby: req.user._id });
    res.send(invoices);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAdminProduct = async (req, res) => {
  try {
    const orders = await Order.find().populate({
      path: "products.product",
      model: "product", // Replace 'Product' with the actual name of your product model
    });

    const orderArr = await Promise.all(
      orders.map(async (order) => {
        const user = await User.findById(order.orderby);
        console.log(user.address, order.address);
        const address = user.address?.find(
          (adr) => JSON.stringify(adr._id) == order.address
        );

        return {
          transactionId: order.transactionId,
          products: order.products.map((productDetail) => ({
            name: productDetail.product.name,
            count: productDetail.count,
            total: productDetail.total,
          })),
          total: order.total,
          status: order.status,
          address: address
            ? `${address.adr}-${address.city}-${address.state}-${address.pincode}`
            : null,
        };
      })
    );

    res.send(orderArr);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const editOrderStatus = async (req, res) => {
  try {
    const status = req.body.status;
    const invoiceNo = req.body.id;

    const order = await Order.findOneAndUpdate(
      { invoiceNo },
      { status },
      { new: true } // Return the modified document
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    console.log(order);
    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getAdminProduct,
  editOrderStatus,
  checkUser,
  getInvoices,
};
