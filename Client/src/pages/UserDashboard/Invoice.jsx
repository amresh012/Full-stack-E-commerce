import React from 'react'
import { FaFileInvoice } from "react-icons/fa";
import Invoices from "../../MOCK_DATA (4).json"
const Invoice = () => {
  return (
    <div  className='border-2 mt-12  shadow-md w-[70vw] b-white'>
     <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
       <div className="bg-blue-500 p-2 text-white rounded-full"><FaFileInvoice/></div>
        <h1>My Invoices</h1>
      </div>
      <div className="h-full space-y-4 p-4 border-2 overflow-y-scroll">
        {
            Invoices.slice(0,6).map((invoice, index) => (
                <div className="border-2 p-4 flex justify-between items-center">
                    <p className='font-bold px-2'>Invoice No: <span className='font-medium'>{invoice.Invoice}</span></p>
                    <button className='p-2 bg-blue-500 text-white font-bold'>Show Invoices</button>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Invoice
