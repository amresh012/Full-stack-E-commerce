import { Button } from '@mui/material';
import React from 'react'
import { BsCloudUpload } from 'react-icons/bs';
// import BasicTable from '../../components/AdminComponents/BasicTable';

const BulkImage = () => {
  const handleUpload = ()=>{
    alert('Upload button clicked')
  }
  return (
    <div className=' rounded-md shadow-md gap-12 h-auto mt-24 flex flex-col items-center justify-around lg:mx-24'>
     <div className="space-y-4 w-full m-auto">
             <div className="relative cursor-pointer">
                <input type="file" className='border-dashed border-2 z-50 h-44 rounded-md focus:shadow-md w-full' accept=".png, .jpg, .jpeg" />
                <div className="-z-10 absolute top-12 left-[40%] flex items-center flex-col gap-2">
                  <BsCloudUpload/>
                <h1>Drag n Drop some files,or click to select files</h1>
                <p className='text-red-500  flex flex-col text-center'>Please upload minimumn 1 images <span>total image size not be larger than 5 MB</span></p>
                </div>
             </div>
           <div className="" onClick={handleUpload}>
           <Button variant="contained"  className='w-full'>Add</Button>
           </div>
        </div>
        <div className="flex flex-col w-full p-2 gap-5">
          <div className="flex justify-between px-12">
            <h1 className='text-4xl'>Previous Uploaded Files</h1>
            <div className="bg-black flex items-center ">
            <input type="search" className='h-10 w-60  focus:shadow-md  outline-none px-2 border-2' />
            <div className="p-2">
            <button className="text-white">Search</button>
            </div>
            </div>
          </div>
          {/* upload list */}
          <div className="w-full">
            {/* <BasicTable/> */}
          </div>
        </div>
    </div>
  )
}

export default BulkImage
