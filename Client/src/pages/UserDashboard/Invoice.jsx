import React from 'react'
import { FaDownload, FaFileInvoice } from "react-icons/fa";
const Invoice = () => {
  return (
    <div className="border-2  mb-4  rounded-md mx-4 b-white p-4">
      <div className="border-b-2 mx-2 mb-2 p-4 text-3xl font-bold flex items-center gap-2">
        <div className="bg-[#144170] p-2 text-white rounded-full">
          <FaFileInvoice />
        </div>
        <h1 className="uppercase">My Invoices</h1>
      </div>
      <div className="h-[90vh] space-y-4 p-4 mt-2  overflow-auto ">
        
      </div>
    </div>
  );
}

export default Invoice
