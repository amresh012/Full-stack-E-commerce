import React from 'react'
import { GoChecklist } from "react-icons/go";
import moment from "moment"
import { MdCurrencyRupee } from "react-icons/md";

const MyOrders = () => {
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
            [...Array(12)].map((_,id)=>(
              <>
                <div className="w-full p-2 uppercase   border-2 rounded-md flex items-start justify-between">
                  <div className="flex items-start justify-start">
                  <div className="image-container p-2 w-fit">
                    <img src="https://picsum.photos/100/100" alt="image" className='rounded-md' />
                  </div>
                  <div className="desc p-2">
                    <h1 className='text-2xl font-bold'>Lorem ipsum dolor</h1>
                    <p className="order-date">
                      orderd date:{" "}
                      {
                        moment().format('llll')
                      }
                    </p>
                    <p className="specifications text-zinc-500">Aspernatur | possimus ex | sunt voluptate | Ratione excepturi?</p>
                    <div className="payment-mode flex items-center gap-2">
                      <p className="">Payment Mode</p>
                      <p className="status bg-blue-200 text-blue-500 w-fit  px-4 rounded-md">UPI</p>
                    </div>
                  </div>
                  </div>
                  <div className="flex flex-col items-center p-2 justify-around h-full gap-2">
                    <p className="price text-2xl font-bold flex items-center"><MdCurrencyRupee/> 12,345.00</p>
                    <p className="quantity ">Qnt:123 unit</p>
                    <div className="order-again-btn bg-[#144170] p-2 text-white rounded-md">
                    <button className="uppercase">Order-again</button>
                  </div>
                  </div>
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
