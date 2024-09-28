import React, { useEffect, useState } from 'react'
import { GoChecklist } from "react-icons/go";
// import moment from "moment"
// import { MdCurrencyRupee } from "react-icons/md";
import {config} from "../../Utils/axiosConfig"
import {base_url} from "../../Utils/baseUrl"
import toast from 'react-hot-toast';
import moment from "moment"
import { FaExclamationCircle } from 'react-icons/fa';
import { useSelector } from "react-redux"


// ststus color
const getStatusColor = (status) => {
  switch (status.toLowerCase()) {
    case "Processing":
      return "bg-red-200 p-2 text-red-500 rounded-md  uppercase"; // Red color for "Return"
    case "success":
      return "text-yellow-500 bg-yellow-200 p-1 rounded-md uppercase"; // Yellow color for "COD"
    case "order confirmed":
      return "text-green-500 bg-green-200  rounded-md uppercase"; // Gray color for "Not Processed"
    case "shipped":
      return "text-blue-500  bg-blue-200 p-2 rounded-md uppercase"; // Blue color for "Shipped"
    case "deliverd":
      return "text-green-500  bg-green-200 p-2 rounded-md uppercase"; // Black color for "Cancelled"
    default:
      return "text-gray-800  bg-gray-200 p-2 rounded-md uppercase"; // Default color
  }
};



const MyOrders = () => {
  const user = useSelector((state) => state.auth.user)
  const [orders, setOrders] = useState([]);
  const id = localStorage.getItem("id") || user?._id

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id)
        try {
          const response = await fetch(`${base_url}user/${id}`, {
            method: "GET",
            ...config,
          });
          const data = await response.json();
          if (!data.error) {
            setOrders(data.order);
          }
        } catch (error) {
          toast.error(error.message);
        }
    };
    fetchUserDetails();
  }, []);
  
  return (
    <>
     <div className="border-2  mb-4 rounded-md mx-4 w-full">
     <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
          <div className="bg-[#144170] p-2 text-white rounded-full">
            <GoChecklist />
          </div>
          <h1 className="uppercase">My Orders</h1>
        </div>
        <div className="orders-section h-[100vh] space-y-2 p-2 overflow-auto">
        { orders.length !==0 && orders !== null ?
          orders.map((order, index) => (
            <div className="border-b space-y-2 h-56 p-2 bg-gray-100" key={index}>
              <h1>Total Products {order.products.length}</h1>
              <span>Invoice No : inv_{order.invoiceNo}</span>
              <p>Order Status :<span className={getStatusColor(order.status)}>{order.status}</span></p>
              <p>Transaction_id :{order.transactionId}</p>
              <p>Total Amount : ₹{order.total}</p>
              <p>Order Time :{moment(order.createdAt).format("YYYY Do MMMM hh:mm a")}</p>
            </div>
          ))
          :
          <div className="h-[50vh] gap-2 w-full flex flex-col items-center justify-center bg-gray-200 mt-4 text-2xl font-bold">
          <span className="text-orange-500 animate-bounce duration-500 delay-300">
            <FaExclamationCircle size={50} />
          </span>
          <p>No Records Found</p>
        </div>
        }
        </div>
     </div>
    </>
  )
}

export default MyOrders
