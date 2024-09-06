import React, { useState } from 'react'
import { FaCheckCircle, FaChevronRight, FaDownload } from 'react-icons/fa'
import { Steps } from 'antd';
import { TbTruckDelivery } from "react-icons/tb";
import { BsReceiptCutoff } from "react-icons/bs";
import {useLocation} from "react-router-dom"
import moment from "moment"

const Confirmation = () => {
    const [current, setCurrent] = useState(4);

    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
      };
      const location = useLocation();
      const stat= location.state || {}
      console.log(stat)
  return (
   <div className=" flex items-center justify-around w-full  p-2 h-screen">
     <div className="bg-green-400 h-full p-4 w-[90vw] text-white rounded-md flex flex-col items-center justify-center gap-12">
       <div className="icons ">
        <FaCheckCircle size={100}/>
       </div>
       <div className="flex items-center justify-around flex-col gap-2">
        <span className=''>THANK YOU</span>
        <p className='text-3xl font-bold'>  YOU ORDER IS CONFIRMED</p>
        <p>We Will Send You an Email confirmation to</p>
       </div>
       <div className="stepper rounded-md  shadow-md w-full p-4 bg-white text-black flex flex-col items-center gap-12 ">
        <div className="text-2xl">
            <p>Order #{stat.order_id} was placed  on {moment().format('MMMM Do YYYY')} and is currently in progress</p>
        </div>
       <Steps
       responsive={true}
       onChange={onChange}
    size="default"
    current={current}
    items={[
      {
        title: status || "order confirmed",
      },
      
    ]
}
  />
   <div className="delivery date flex gap-4">
    <p>Expected Delivery Date: <span className='font-bold italic'>{moment().format('MMMM Do YYYY')}</span> </p>
      <button className="text-[#0a2444] underline">Track Your Order</button>
  </div>
       </div>
     </div>
     <div className="right-side bg-gray-100 p-2 rounded-md flex flex-col gap-4  h-full w-1/3">
      <div className="oder-detail flex justify-between items-center border-b-2 border-black p-2">
        <h1 className='font-bold'>
            <h1 className='text-xl'>Order Detail</h1>
            <span>#205966</span>
        </h1>
        <div className="border-2 border-black flex items-center p-2 gap-2 rounded-md">
            <FaDownload/>
            <button>Download Invoice</button>
        </div>
      </div>
      <div className="address">
        <div className="delivery-address flex items-center justify-between border-b-2 border-black p-4">
            <div className="flex items-center gap-2 font-bold text-xl">
                <TbTruckDelivery size={40}/>
                <span>Delivery Address</span>
            </div>
            <button className="text-[#0a2444] font-bold underline text-xs">Change Details</button>
        </div>
         <div className="p-4 font-bold">
            <p className="">
                Neelam Chawok NIT , Faridabad Haryana, 270134 INDIA
            </p>
         </div>
         {/* billing address */}
         <div className="delivery-address flex items-center justify-between border-b-2 border-black  p-4">
            <div className="flex items-center gap-2 font-bold text-2xl">
                <BsReceiptCutoff size={40}/>
                <span>Billing Address</span>
            </div>
        </div>
         <div className="p-4 font-bold">
            <p className="">
                Neelam Chawok NIT , Faridabad Haryana, 270134 INDIA
            </p>
         </div>
         {/* contact-details */}
         <div className="delivery-address flex items-center justify-between border-b-2 border-black p-4">
            <div className="flex items-center gap-2 font-bold text-2xl">
                <BsReceiptCutoff size={40}/>
                <span>Contact Details</span>
            </div>
        </div>
         <div className="p-4 font-bold flex flex-col">
            <span>Email: kfsfitnessnoreply@gmail.com</span>
            <span>Phone: 99782343</span>
            <span>Phone: 99782343</span>
         </div>
      </div>
      <div className="order-summary space-y-6">
        <div className="bg-[#0a2444] p-2  text-white flex justify-between rounded-md">
            <span>Order Summary (3)</span>
            <FaChevronRight/>
        </div>
        <div className="amout space-y-4 ">
            <div className="flex justify-between">
                <p>Sub total</p>
                <p>{stat.amount}</p>
            </div>
            <div className="flex justify-between">
                <p>Delivery Charges</p>
                <p>{deliveryCharge}</p>
            </div>
            <div className="flex justify-between font-bold text-xl border-t-2 border-black pt-2">
                <p>Total</p>
                <p>{stat.amount- deliveryCharge}</p>
            </div>
        </div>
      </div>
     </div>
   </div>
  )
}

export default Confirmation
