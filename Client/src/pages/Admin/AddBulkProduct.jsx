import { Button } from '@mui/material'
import React from 'react'
import { SiMicrosoftexcel } from "react-icons/si";

const AddBulkProduct = () => {
 
  return (
    <div className='flex flex-col w-full h-screen items-center justify-start gap-12 px-12'>
      <h1 className='text-4xl text-center'>Upload Products in bulk using Excel file</h1>
      <div className="upload relative">
        <input type="file" id="inputFile" className='h-[300px] w-[30rem] border-dashed border-2 z-50 ' accept='.csv, .xlsx, .xlsm ,.xlt' />
        <div className="-z-10 absolute top-20 left-40 flex flex-col items-center gap-2 bg-white">
          <SiMicrosoftexcel size={80} className='text-green-800'/>
           <span className=''>Click to upload Excel</span>
        </div>
      </div>
      <p className='w-1/2 text-center text-blue-400'>Make sure before upload your excel file that your excel is written in right format.
if it not fomat in correct way it will not uplaoded !!
Here is reference excel file download it and start uploading</p>
<span className='text-red-500'>** Make a comma sepration in image field in excel to add multiple mages</span>
   <a href="/">
   <Button variant='contained'>Download Excel</Button>
   </a>
    </div>
  )
}

export default AddBulkProduct
