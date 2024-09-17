import React, { useEffect, useState } from 'react'
import { GoChecklist } from "react-icons/go";
// import moment from "moment"
// import { MdCurrencyRupee } from "react-icons/md";
import {config} from "../../Utils/axiosConfig"
import {base_url} from "../../Utils/baseUrl"
import toast from 'react-hot-toast';
import { FaExclamationCircle } from 'react-icons/fa';
import {useSelector} from "react-redux"
const id = localStorage.getItem("id")
console.log(id)
const MyOrders = () => {
  const user = useSelector((state) => state.auth.user)
  // console.log("uesr from my order------------", user)
  const [orders, setOrders] = useState([]);
  const id = localStorage.getItem("id") || user?._id
  // console.log(id)

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id)
        try {
          const response = await fetch(`${base_url}user/${id}`, {
            method: "GET",
            ...config,
          });
          const data = await response.json();
           console.log(data)
          if (!data.error) {
            setOrders(data.order);
          }
        } catch (error) {
          toast.error(error.message);
        }
    };
    fetchUserDetails();
  }, []);
  console.log(orders);
  
  return (
    <>
     <div className="border-2  mb-4 rounded-md mx-4">
     <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
          <div className="bg-[#144170] p-2 text-white rounded-full">
            <GoChecklist />
          </div>
          <h1 className="uppercase">My Orders</h1>
        </div>
        <div className="orders-section h-[100vh] space-y-2 p-2 overflow-auto ">
        <div className="h-[50vh] gap-2 w-full flex flex-col items-center justify-center bg-gray-100 mt-4 text-2xl font-bold">
        <span className="text-orange-400"><FaExclamationCircle size={50}/></span>
        <p>No Records Found</p>
      </div>
        </div>
     </div>
    </>
  )
}

export default MyOrders
