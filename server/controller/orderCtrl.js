const OrderModel =  require("../models/orderModel")
const Userodel = require("../models/userModel")
const ProductModel = require("../models/productModel")
const InvoiceModel = require("../models/invoiceModel")
const Invoice = require("../controller/invoiceCtrl")



  // get All Orders
  const getAllOrders = async (req, res) => {
    try {
      // Fetch all orders from the database
      const orders = await OrderModel.find()
      .populate({
        path: "cartItems",
        populate: [
          { path: "_id",
            model: "product",
            select: "name"
           },
        ]

      }
      ).populate({
        path: "invoiceNo",
        model: "invoice",
        select: "invoiceNo"
      })
      // Send the orders as the response
      res.status(200).json({
        success: true,
        count: orders.length,
        data: orders,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
      
      // Send an error response
      res.status(500).json({
        success: false,
        message: "Error fetching orders",
        error: error.message,
      });
    }
  };

  const deleteOrder = async (req, res) => {
    try {
      // Get the order id from the request parameters
      const id = req.params._id;
  
      // Find and remove the order by its id
      const order = await OrderModel.findOneAndRemove({ _id: id });
  
      // If the order is not found, return a 404 error
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
  
      // Find and remove the associated invoice
      await InvoiceModel.findOneAndRemove({ orderId: id });
  
      // Return a success message
      res.json({ message: "Order deleted successfully" });
    } catch (error) {
      // Log the error and return a 500 error
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };


  // getSinglOrder
  const getSingleOrder = async (req, res) => {
    try {
      // Extract the order ID from the request parameters
      const { id } = req.params;

      // Find the order by ID and populate related data (like products and invoice)
      const order = await OrderModel.findById(id)
        .populate({
          path: "cartItems",
          populate: {
            path: "_id",
            model: "product",
            select: "name",
          },
        })
        .populate({
          path: "invoiceNo",
          model: "invoice",
          select: "invoiceNo",
        });

      // Check if the order exists
      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Send the order data as a response
      res.status(200).json({
        success: true,
        data: order,
      });
    } catch (error) {
      // Handle any errors during the process
      console.error("Error fetching the order:", error);
      res.status(500).json({
        success: false,
        message: "Error fetching the order",
        error: error.message,
      });
    }
  };


  // edit order status
  const editOrderStatus = async (req, res) => {
      try {
        const status = req.body.status;
        const invoiceNo = req.body.id;
    
        const order = await OrderModel.findOneAndUpdate(
          { invoiceNo },
          { new: true } // Return the modified document
        );
    
        if (!order) {
          return res.status(404).json({ error: "Order not found" });
        }
    
        
        res.json({ message: "Order status updated successfully", order });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
      }
    };

    const getInvoices = async (req, res) => {
        try {
          const invoices = await InvoiceModel.find({ orderby: req.user._id }).populate({path:"orderby" , model:"User", select:"name"});
          res.send(invoices);
        } catch (error) {
          console.error(error);
          res.status(500).send("Internal Server Error");
        }
      };


module.exports= {getInvoices, editOrderStatus , deleteOrder, getSingleOrder ,getAllOrders}









// const { decode } = require("jsonwebtoken");
// const Order = require("../models/orderModel");
// const Product = require("../models/productModel");
// const User = require("../models/userModel");
// const InvoiceModel = require("../models/invoiceModel");
// const jwt = require("jsonwebtoken");
// const { sendEmail } = require("./emailCtrl");
// const invoice = require("./invoiceCtrl");
// function generateId() {
//   const timestamp = new Date().getTime();
//   const randomDigits = Math.floor(10000000 + Math.random() * 90000000); // Random 8-digit number
//   const orderId = `${timestamp}${randomDigits}`.substring(0, 8);
//   return orderId;
// }

// const createOrder = async (req, res, next) => {
//   const user = req.user;
//   let address = req.body.address;
//   let adr, placeofsup, gstNo;
//   for (let i = 0; i < user.address.length; i++) {
//     if (JSON.stringify(user.address[i]._id) == JSON.stringify(address)) {
//       adr = `${user.address[i].adr} , ${user.address[i].city} , ${user.address[i].state} - ${user.address[i].pincode}`;
//       placeofsup = user.address[i].city;
//       gstNo = user.address[i].gstNo;
//     }
//   }
//   let totalValue = parseInt(user.cart.totalValue);
//   let isCoupon = false;
//   
//   if (user.cart?.products?.length > 0) {
//     if (user.cart.isCouponApplied?.code) {
//       isCoupon = {
//         code: user.cart.isCouponApplied.code,
//         discountrs: parseInt(user.cart.isCouponApplied.discountValue),
//       };
//     }

//     const newOrder = {
//       products: user.cart.products,
//       total: totalValue,
//       orderby: user._id,
//       address: address,
//       transactionId: req.body.transactionId || generateId(),
//       invoiceNo: generateId(),
//     };

//     const createdOrder = await Order.create(newOrder);
//     const orders = await Order.find({ _id: createdOrder._id }).populate({
//       path: "products.product",
//       model: "product",
//     });

//     const orderArr = orders.map((order) => ({
//       transactionId: order.transactionId,
//       products: order.products.map((product) => {
//         return {
//           name: product.product.name,
//           image: product.product.images[0],
//           count: product.count,
//           total: product.total,
//           price: product.product.total,
//           hsn: product.product.hsnCode,
//           unit: product.product.unitMeausrement,
//         };
//       }),
//       total: order.total,
//       status: order.status,
//     }));

//     const detail = {
//       invoiceno: newOrder.invoiceNo,
//       userName: req.user.name,
//       userAdress: adr,
//       totalPrice: totalValue,
//       productDetails: orderArr[0].products,
//       isCoupon,
//       placeofsup,
//       gstNo: gstNo,
//     };
//     const invoiced = {
//       invoiceNo: newOrder.invoiceNo,
//       products: orderArr[0].products,
//       invoice: invoice(detail),
//       total: orderArr[0].total,
//       orderby: req.user._id,
//     };
//     await InvoiceModel.create(invoiced);
//     await User.findOneAndUpdate(
//       { _id: req.user._id },
//       {
//         $set: {
//           "cart.products": [],
//           "cart.totalValue": 0,
//           "cart.isCouponApplied": {},
//         },
//       },
//       { new: true }
//     );
//     res.redirect(`https://eccomerce1.deepmart.shop/users/orders/success`);
//   } else {
//     res.status(500).send({ error: "No product found in user cart" });
//   }
// };

// const checkUser = async (req, res, next) => {
//   let token = req.body.userid;
//   try {
//     if (token) {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       const user = await User.findById(decoded?.id);
//       req.user = user;
//       next();
//     }
//   } catch (error) {
//     res.json({ error: "Not Authorized token expired, Please Login again" });
//   }
// };

// const getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ orderby: req.user._id }).populate({
//       path: "products.product",
//       model: "product",
//     });
//     
//     const orderArr = orders.map((order) => ({
//       transactionId: order.transactionId,
//       products: order.products.map((product) => ({
//         name: product.product.name,
//         id: product.product._id,
//         image: product.product.images[0],
//         category: product.product.category,
//         count: product.count,
//         total: product.total,
//       })),
//       total: order.total,
//       status: order.status,
//       address: order.address,
//     }));

//     res.send(orderArr);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const getInvoices = async (req, res) => {
//   try {
//     const invoices = await InvoiceModel.find({ orderby: req.user._id });
//     res.send(invoices);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const getAdminProduct = async (req, res) => {
//   try {
//     const orders = await Order.find().populate({
//       path: "products.product",
//       model: "product", // Replace 'Product' with the actual name of your product model
//     });

//     const orderArr = await Promise.all(
//       orders.map(async (order) => {
//         const user = await User.findById(order.orderby);
//         
//         const address = user.address?.find(
//           (adr) => JSON.stringify(adr._id) == order.address
//         );

//         return {
//           transactionId: order.transactionId,
//           products: order.products.map((productDetail) => ({
//             name: productDetail.product.name,
//             count: productDetail.count,
//             total: productDetail.total,
//           })),
//           total: order.total,
//           status: order.status,
//           address: address
//             ? `${address.adr}-${address.city}-${address.state}-${address.pincode}`
//             : null,
//         };
//       })
//     );

//     res.send(orderArr);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

// const editOrderStatus = async (req, res) => {
//   try {
//     const status = req.body.status;
//     const invoiceNo = req.body.id;

//     const order = await Order.findOneAndUpdate(
//       { invoiceNo },
//       { status },
//       { new: true } // Return the modified document
//     );

//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     
//     res.json({ message: "Order status updated successfully", order });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// module.exports = {
//   createOrder,
//   getOrders,
//   getAdminProduct,
//   editOrderStatus,
//   checkUser,
//   getInvoices,
// };
