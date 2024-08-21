import React from 'react'
import { HiOutlineDocumentReport } from "react-icons/hi";

const Report = () => {
  return (
   <>
     <div className=" border-2 h-screen mx-4 rounded-md">
     <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
          <div className="bg-[#038CCC] p-2 text-white rounded-full">
            <HiOutlineDocumentReport />
          </div>
          <h1 className="uppercase">Report</h1>
        </div>
     </div>
   </>
  )
}

export default Report
