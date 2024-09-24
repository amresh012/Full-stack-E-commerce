import React from 'react'
import { FaChevronRight } from 'react-icons/fa';
import { VscLinkExternal } from "react-icons/vsc";
import {Link, useLocation} from "react-router-dom"
import {toast , Toaster} from "react-hot-toast"
import { MdOutlineContactPhone } from "react-icons/md";


const OrderSuccess = () => {
 
    const location = useLocation(); 1
    const stat = location.state || {}
    console.log(stat)
    const { address, items, email } = stat



  return (
    <div className='grid lg:grid-cols-2 place-items-start  place-content-center gap-12 w-full p-4'>
     <div className="h-auto  w-full">
        <div className=" p-4 gap-2 flex flex-col items-start justify-start">
            <h1 className='text-[4vmax] font-bold'>ThankYou For Your Purchase!</h1>
            <p className="">Your Order Will be processed within 24 hours during working days. 
                We will Notify you by email once your order has been shipped 
                 <span> at <span className='text-blue-500 underline italic'>{email || "rgerg"}</span></span></p>
                <div className="mt-6 flex items-center gap-1 shadow-md bg-[#0a2444] rounded-full  text-white p-2">
                <button className=''>Track Your Order</button>
                 <VscLinkExternal/>
                </div>
        </div>
        <div className="address flex flex-wrap   justify-between items-center gap-2 py-2 lg:px-4">
            <div className="billing space-y-2 ">
            <h1 className='text-xl font-bold underline'>Billing Address</h1>
               <div className="flex justify-between">
                  <span  className='font-bold'>Name:</span>
                  <p className="">{address?.name}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>Contact:</span>
                  <p className="">{address?.mobile}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>Address:</span>
                  <p className="">{address?.address}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>City:</span>
                  <p className="">{address?.city}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>State:</span>
                  <p className="">{address?.state}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>PinCode:</span>
                  <p className="">{address?.zipcode}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>Country:</span>
                  <p className="">INDIA</p>
                </div>
            </div>
            <div className="shipping space-y-2">
            <h1 className='text-xl font-bold underline'>Shpping Address</h1>
            <div className="flex justify-between">
                  <span  className='font-bold'>Name:</span>
                  <p className="">{address?.name}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>Contact:</span>
                  <p className="">{address?.mobile}</p>
                </div>
                <div className="flex justify-between">
                  <span className='font-bold'>Address:</span>
                  <p className="">{address?.address}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>City:</span>
                  <p className="">{address?.city}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>State:</span>
                  <p className="">{address?.state}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>PinCode:</span>
                  <p className="">{address?.zipcode}</p>
                </div>
                <div className="flex justify-between">
                  <span  className='font-bold'>Country:</span>
                  <p className="">INDIA</p>
                </div>
            </div>
        </div>
     </div>
     <div className="box pb-24 lg:w-[30rem] w-full bg-gray-100  rounded-md">
        <h1 className='p-2 text-[3vmax] border-b border-black/20 border-dashed m-1'>Order summary</h1>
        <div className=" flex items-center gap-2 p-2 justify-around m-1  border-b border-black/20 border-dashed ">
            <div className="date w-full">
                <span className='font-bold'>Date</span>
                <p className="order-date">{stat?.selectedShiping?.etd}</p>
            </div>
            <span className="h-14 bg-black w-[1px]"></span>
            <div className="date w-full">
                <span className='font-bold'>Order Number</span>
                <p className="order-no">#{stat.orderData.shippting.order_id}</p>
            </div>
            <span className="h-14 bg-black w-[1px]"></span>
            <div className="date w-full">
                <span className='font-bold'>Payment Status</span>
                <p className="order-method bg-green-200 text-green-500 w-fit p-1">Paid</p>
            </div>
        </div>
        <div className="products p-4 border-b border-black border-dotted m-1">
            <h1 className='text-[2vmin] font-bold underline'>Order Items</h1>
            <div className="products-list space-y-2 p-2 bg-slate-400/20 rounded-md ">
             {
                items?.map((item)=>(
                    <div className="w-full flex items-center gap-2">
                        <div className="image-box">
                            <img src={item.url} alt="" className="h-12" />
                        </div>
                        <div className="flex w-full justify-between">
                           <div className="">
                           <h1  className='font-bold'>{item.name}</h1>
                           <span>Qty:{item.count}</span>
                           </div>
                           <span className='font-bold'>₹{item.total}</span>
                        </div>
                    </div>
                ))
             }
             
            </div>
        </div>
        <div className="order-summary space-y-6 w-full p-4">
              <div className="bg-[#0a2444] p-2  text-white flex justify-between rounded-md">
                <span>Order Summary {stat?.totalQuantity}</span>
                <FaChevronRight />
              </div>
              <div className="amout space-y-4 ">
                <div className="flex justify-between">
                  <p>Sub total</p>
                  <p>₹{stat?.CartTotal || 0}</p>
                </div>
                <div className="flex justify-between">
                  <p>Delivery Charges</p>
                  <p>₹{stat?.deliverCharge || 0}</p>
                </div>
                <div className="flex justify-between font-bold text-xl border-t-2 border-black pt-2">
                  <p>Total</p>
                  <p>₹{stat?.CartTotal + stat?.deliverCharge || 0}</p>
                </div>
              </div>
            </div>
            <div className="delivery-address  flex flex-col items-start gap-2  p-4">
                <div className="flex items-center gap-2 font-bold border-b border-black w-full pb-4 text-[2vmin]">
                  <MdOutlineContactPhone size={25} />
                  <span>Contact Details</span>
                </div>
              <div className="p-2 flex flex-col">
                <span>Email: noreply@kfsfitness.com</span>
                <span>Phone: 9978234333</span>
                <span>Phone: 9978234345</span>
              </div>
              </div>
     </div>
    </div>
  )
}

export default OrderSuccess
