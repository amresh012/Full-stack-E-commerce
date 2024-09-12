import React, { useEffect, useState } from 'react'
import { GoChecklist } from "react-icons/go";
// import moment from "moment"
// import { MdCurrencyRupee } from "react-icons/md";
import {config} from "../../Utils/axiosConfig"
import {base_url} from "../../Utils/baseUrl"
import toast from 'react-hot-toast';
const id  = localStorage.getItem("id")
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const id = localStorage.getItem("id")
  console.log(id)

  
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (id)
        try {
          const response = await fetch(`${base_url}user/${id}`, {
            method: "GET",
            ...config,
          });
          const data = await response.json();
          //  console.log(data)
          if (!data.error) {
            setOrders({data});
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
        </div>
     </div>
    </>
  )
}

export default MyOrders
