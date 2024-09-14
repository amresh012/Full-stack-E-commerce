import React from 'react'
import { FaDownload, FaExclamationCircle, FaFileInvoice } from "react-icons/fa";
import {useSelector}from "react-redux"
const Invoice = () => {
  return (
    <div className="border-2  mb-4  rounded-md mx-4 b-white ">
      <div className="border-b-2 mx-2 mb-2 p-4 text-3xl font-bold flex items-center gap-2">
        <div className="bg-[#144170] p-2 text-white rounded-full">
          <FaFileInvoice />
        </div>
        <h1 className="uppercase">My Invoices</h1>
      </div>
      <div className="h-[90vh] space-y-4 p-2 mt-2  overflow-auto ">
      <div className="h-[50vh] gap-2 w-full flex flex-col items-center justify-center bg-gray-100 mt-4 text-2xl font-bold">
        <span className="text-orange-400"><FaExclamationCircle size={50}/></span>
        <p>No Records Found</p>
      </div>
      </div>
    </div>
  );
}

export default Invoice
