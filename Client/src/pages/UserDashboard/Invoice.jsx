import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaDownload, FaExclamationCircle, FaFileInvoice } from "react-icons/fa";
import {useSelector}from "react-redux"
import { base_url } from '../../Utils/baseUrl';
import { config } from '../../Utils/axiosConfig';
import parse from "html-react-parser";
const Invoice = () => {
  const [invoice , setInvoice] = useState()
  const [displayInvoice, setDisplayInvoice] = useState(null);

  const fetchInvoice =  async()=>{
    try{
       const response = await axios.get(`${base_url}order/invoice` , config)
       console.log(response)
       setInvoice(response.data)
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    fetchInvoice()
  },[])

  const handleClick = (invoice) => {
    setDisplayInvoice(invoice);
  };

  const handlePrint = () => {
    const invoiceContent = document.getElementById("invoice-content");
    if (invoiceContent) {
      const popupWin = window.open("", "_blank");
      popupWin.document.open();
      popupWin.document.write(
        `${invoiceContent.innerHTML}`
      );
      // popupWin.document.close();
      popupWin.print();
      // popupWin.close();
    }
  };



  return (
    <>
      <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
          <div className="bg-[#144170] p-2 text-white rounded-full">
            <FaFileInvoice/>
          </div>
          <h1 className="uppercase">My Orders</h1>
        </div>
      <div className="w-full p-2">
        {invoice?.map((ele, index) => (
          <div className="border mt-3 p-2 rounded-md" key={index}>
            <div className="flex justify-between items-center">
              <p className="text-md text-gray-800 font-semibold">
                Invoice No:{" "}
                <span className="font-bold pl-2 text-gray-700">
                  {" "}
                  {ele.invoiceNo}
                </span>{" "}
              </p>

              <button
                className="bg-[#3D9BFF] block sm:hidden mt-3 text-white p-2 rounded-md"
                onClick={handlePrint}
              >
                Print Invoice
              </button>

              <button
                className="bg-[#3D9BFF] hidden sm:block text-white p-2 rounded-md"
                onClick={() => handleClick(ele.invoice)}
              >
                Show Invoice
              </button>
            </div>
            {displayInvoice === ele.invoice && (
              <div className="m-4" id="invoice-content">
                {parse(ele.invoice)}
                <button
                  className="bg-[#3D9BFF] mt-3 text-white p-2 rounded-md"
                  onClick={handlePrint}
                >
                  Print Invoices
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>

  );
}

export default Invoice
