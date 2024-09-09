import React, { useEffect, useState } from 'react'
import { GoChecklist } from "react-icons/go";
import moment from "moment"
import { MdCurrencyRupee } from "react-icons/md";
import {config} from "../../Utils/axiosConfig"
import {base_url} from "../../Utils/baseUrl"
const id  = localStorage.getItem("id")
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const FetchOrder =async() => {
      try {
        const re = await fetch(`${base_url}order/getaOrder/${id}`, 
          {
            ...config
          }
        );
        console.log(re)
        setOrders(re.data)
      }
      catch (error) {
        console.log(error)
      }
    }
  FetchOrder()
 },[])
  
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
          {
           orders?.map((order,id)=>(
              <>
                <div className="w-full p-2 uppercase   border-2 rounded-md flex items-start justify-between">
                
                </div>
          </>
            ))
          }
        </div>
     </div>
    </>
  )
}

export default MyOrders
