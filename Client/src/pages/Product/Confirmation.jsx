import React, { useEffect, useState } from 'react'
import { FaCheckCircle, FaChevronRight, FaDownload } from 'react-icons/fa'
import { TbTruckDelivery } from "react-icons/tb";
import { BsReceiptCutoff } from "react-icons/bs";
import { MdOutlineContactPhone } from "react-icons/md";
import Stepper from '../../components/reusablesUI/Stepper';
import {Link, useLocation} from "react-router-dom"
import moment from "moment"
import axios from "axios"
import { config } from '../../Utils/axiosConfig';
import { base_url } from '../../Utils/baseUrl';
import {toast , Toaster} from "react-hot-toast"

const Confirmation = () => {
    const [current, setCurrent] = useState(2);
    const [invoice, setInvoiceId] = useState("")
    const [InvoiceUrl , setInvoiceUrl] = useState("")
    console.log(InvoiceUrl)
    const onChange = (value) => {
        setCurrent(value);
      };
      const location = useLocation();1
      const stat = location.state || {}
      // console.log(stat);
    const steps = [ 'Order Confirmed','Payment', 'Shipping', 'Review', 'Complete'];
    // invoiceData
    const {address ,items,email} = stat
    // createInvoic
    useEffect(()=>{
      const datatosend = {address, items ,email,stat}
      const CreateInvoice =  async()=>{
        const invoice = await axios.post(`${base_url}invoice/create`, {datatosend},config);
        console.log(invoice)
        if(invoice.data){
          setInvoiceUrl(invoice.data.short_url)
          setInvoiceId(invoice.data.id)
        }
      }
      const fetchinvoice = async()=>{
        const invoicebyid = await axios.get(`${base_url}invoice/getbyid/${invoice}`)
        console.log(invoicebyid)
      }
      CreateInvoice()
      fetchinvoice()
    },[])
    
    const handleInvoice =()=>{
      if(InvoiceUrl==""){
         toast.error("Invoice not generated")
      }
      else{
        toast.success("Invoice is Ready")
      }
    }
  return (
    <>
   <div className=" flex flex-col gap-4 lg:flex-row items-start justify-center p-2 ">
     <div className=" h-full lg:w-2/3 p-2 rounded-md flex flex-col items-center justify-center gap-4">
       <div className="stepper bg-gray-200 rounded-md  shadow-md w-full p-2 text-black flex flex-col items-center gap-12 ">
       <div className="icons text-green-500 ">
        <FaCheckCircle size={50}/>
       </div>
       <div className="flex items-center justify-around flex-col">
        <span className=''>THANK YOU</span>
        <p className='text-3xl font-bold text-center'>  YOU ORDER IS CONFIRMED</p>
       </div>
        <div className="text-2xl text-center">
            <p>Order #{stat.order_id} was placed  on {moment().format('MMMM Do YYYY')} and is currently in progress</p>
        </div>
        {/* <div className="shippincompany-information w-full">
        <h1 className=''><span className='text-xl'>Courier Company Name</span> :- {stat?.selectedShiping?.courier_name}</h1>
       </div> */}
       <Stepper steps={steps} currentStep={current}/>
   <div className="delivery date flex lg:flex-row flex-col  gap-4">
    <p className="">Your Order will be Deliverd in {stat?.selectedShiping?.estimated_delivery_days} days</p>
    <p>Expected Delivery Date: <span className='font-bold italic'>{stat?.selectedShiping?.etd}</span> </p>
      <button className="text-[#0a2444] underline">Track Your Order</button>
  </div>
  <div className="flex items-center flex-wrap gap-4">
    <Link to="/">
    <button className='underline'>Back to home</button>
    </Link>
    <Link to="/product">
    <button className='underline bg-[#0a2444] p-2 text-white'>Continue Shopping</button>
    </Link>
  </div>
       </div>
     </div>
     {/* order summary */}
     <div className="right-side bg-gray-100 border shadow-md p-2 rounded-md flex lg:flex-col gap-4 flex-wrap h-max  w-[30rem] items-start">
      <div className="oder-detail flex w-full justify-between items-center border-b-2 border-black p-2">
        <h1 className='font-bold'>
            <h1 className='text-xl'>Order Detail</h1>
            <span className='text-sm'>#{stat?.orderData?.shippting?.order_id}</span>
        </h1>
        <div onClick={handleInvoice} className=" flex items-center text-sm  gap-2 rounded-md bg-[#0a2444] p-2 text-white active:scale-95">
          <Link to={InvoiceUrl}>
          <button >Get Invoice</button>
          </Link>
        </div>
      </div>
      <div className="address flex flex-col w-full">
        <div className="delivery-address flex  w-full items-center justify-between border-b border-black p-2">
            <div className="flex items-center gap-2  font-bold">
                <TbTruckDelivery size={25}/>
                <span>Delivery Address</span>
            </div>
           <Link to="/profile/shipping-add">
           <button className="text-[#0a2444] font-bold underline text-xs">Change Address Details</button>
           </Link>
        </div>
         <div className="p-2">
         <p className="flex flex-col gap-2">
            <span>City:{stat?.address?.city}</span>
            <span>State:{stat?.address?.state}</span>
            <span>zipcode:{stat?.address?.zipcode}</span>
            </p>
         </div>
         {/* billing address */}
         <div className="delivery-address flex items-center justify-between border-b border-black  p-2">
            <div className="flex items-center gap-2 font-bold">
                <BsReceiptCutoff size={25}/>
                <span>Billing Address</span>
            </div>
        </div>
         <div className="p-2">
            <p className="flex flex-col gap-2">
            <span>City:{stat?.address?.city}</span>
            <span>State:{stat?.address?.state}</span>
            <span>zipcode:{stat?.address?.zipcode}</span>
            </p>
         </div>
         {/* contact-details */}
         <div className="delivery-address flex items-center justify-between border-b border-black p-2">
            <div className="flex items-center gap-2 font-bold">
                <MdOutlineContactPhone size={25}/>
                <span>Contact Details</span>
            </div>
        </div>
         <div className="p-2 flex flex-col">
            <span>Email: kfsfitnessnoreply@gmail.com</span>
            <span>Phone: 9978234333</span>
            <span>Phone: 9978234345</span>
         </div>
      </div>
      <div className="order-summary space-y-6 w-full">
        <div className="bg-[#0a2444] p-2  text-white flex justify-between rounded-md">
            <span>Order Summary {stat.totalQuantity}</span>
            <FaChevronRight/>
        </div>
        <div className="amout space-y-4 ">
            <div className="flex justify-between">
                <p>Sub total</p>
                <p>{stat.totalAmount || 0}</p>
            </div>
            <div className="flex justify-between">
                <p>Delivery Charges</p>
                <p>{stat.deliverCharge || 0}</p>
            </div>
            <div className="flex justify-between font-bold text-xl border-t-2 border-black pt-2">
                <p>Total</p>
                <p>{stat.totalAmount + stat.deliverCharge || 0}</p>
            </div>
        </div>
      </div>
     </div>
   </div>
    </>
  )
}

export default Confirmation