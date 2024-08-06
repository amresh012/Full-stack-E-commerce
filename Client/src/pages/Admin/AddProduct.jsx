import { Autocomplete, Button, TextField } from '@mui/material'
import React from 'react'
import { BsCloudUpload } from "react-icons/bs";
import { Link } from 'react-router-dom';

const AddProduct = () => {
  return (
    <div className='border-2 rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around lg:mx-24 p-6'>
     <div className="text-3xl font-bold ">
       <Link to="/admin/product-list">
       Add Products
       </Link>
     </div>
     {/* Product add */}
     <div className="w-full space-y-12">
        {/* section-1 */}
        <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Product Name</label>
                <input type="text" className='h-12 border-2 rounded-md outline-none px-2 ' placeholder='enter product name' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Product Category</label>
                <Autocomplete
                sx={{ width: 350 }}
                renderInput={(params) => <TextField {...params} label="enter category" />}
            
               
                />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Product Sub category</label>
                <Autocomplete
                sx={{ width: 350 }}
                renderInput={(params) => <TextField {...params} label="enter sub category" />}
                />
            </div>
        </div>
        {/* section-2 */}
        <div className="flex gap-12 items-center justify-around">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Product Price</label>
                <input type="text" className='h-12 border-2 rounded-md outline-none px-2 ' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Price Per Pices</label>
                <input type="text" className='h-12 border-2 rounded-md outline-none  px-2 ' />
            </div>
        </div>
        {/* section-3 */}
        <div className="flex gap-12 items-center justify-around">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Item Code</label>
                <input type="number" className='h-12 border-2 rounded-md outline-none px-2 ' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">HSN Code</label>
                <input type="number" className='h-12 border-2 rounded-md outline-none  px-2 ' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Unit Of Measurement</label>
                <input type="number" className='h-12 border-2 rounded-md outline-none  px-2 ' />
            </div>
        </div>
        {/* section-3 */}
        <div className="flex gap-12 items-center justify-around">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Corporate Discount</label>
                <input type="text" className='h-12 border-2 rounded-md outline-none px-2 ' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Individual Discount</label>
                <input type="text" className='h-12 border-2 rounded-md outline-none  px-2 ' />
            </div>
            {/* <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Unit Of Measurement</label>
                <input type="text" className='h-12 border-2 rounded-md outline-none  px-2 ' />
            </div> */}
        </div>
        {/* section-4 */}
        <div className="">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Select Product Variant</label>
                <Autocomplete
                sx={{ width: "100%" }}
                renderInput={(params) => <TextField {...params} label="Select Variant" />}
                />
            </div>
        </div>
        {/* section-5 */}
        <div className="space-y-2">
            <label htmlFor="">Product Description</label>
        <TextField id="outlined-basic" label="Description" variant="outlined" className='w-full' />
        </div>
        {/* section-6 */}
        <div className="space-y-4">
             <div className="relative">
                <input type="file" name="" id="" className='border-dashed border-2 h-44 rounded-md focus:shadow-md w-full' />
                <div className="absolute top-12 left-[40%] flex items-center flex-col gap-2">
                  <BsCloudUpload/>
                <h1>Drag n Drop some files,or click to select files</h1>
                <p className='text-red-500  flex flex-col text-center'>Please upload minimumn 1 images <span>total image size not be larger than 5 MB</span></p>
                </div>
             </div>
            <Button variant="contained"  className='w-full'>Add</Button>
        </div>
     </div>
    </div>
  )
}

export default AddProduct
