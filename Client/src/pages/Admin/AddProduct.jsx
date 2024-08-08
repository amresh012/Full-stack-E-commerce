import { Autocomplete, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { BsCloudUpload } from "react-icons/bs";
import { Link } from 'react-router-dom';
import {gym_equipment} from "../../constant"
import {useFormik} from "formik"
import axios from 'axios'
import { base_url } from '../../Utils/baseUrl';
import {toast ,Toaster} from 'react-hot-toast';

const AddProduct = () => {
    const [error , setError] = useState("")
   const {values , handleBlur, handleSubmit , handleChange} = useFormik({
    initialValues: {
        name:"",
        images:[],
        price: "",
        category:"",
        subcategory:"",
        itemCode:"",
        hsnCode:"",
        perpiece:"",
        measurment:"",
        quantity:+"",
        description:"",
        Individual_discount:"",
        corporate_discount:"",
        mindiscription:"",
    },
    onSubmit: async (values, { setSubmitting }) => {
        try {
          const response = await axios.post(`${base_url}product/add`, values,);
          console.log(response)
          if(response.data.error){
             throw new Error(response.data.error)
          }
          else{
            toast.success('Product Added Successfully')
          }
        } catch (error) {
          console.log(error.message)
        } finally {
          setSubmitting(false);
        }
      }

   })



  return (
    <>
    <Toaster/>
    <div className='border-2 rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around lg:mx-24 p-6'>
     <div className="text-3xl font-bold ">
       <Link to="/admin/product-list">
       Add Products
       </Link>
     </div>
     {/* Product add */}
     <form onSubmit={handleSubmit}  className="w-full space-y-12">
        {/* section-1 */}
        <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Product Name</label>
                <input 
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
                className='h-14 border-2 rounded-md outline-none px-2 ' 
                placeholder='enter product name' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Product Category</label>
                <input type="text"
                 value={values.category}
                 id="category" onChange={handleChange}
                 className='h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2' placeholder='enter category'
                  />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Product Sub category</label>
                <input type="text"
                 value={values.subcategory}
                 id="subcategory" onChange={handleChange}
                 className='h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2' placeholder='enter subcategory'
                  />
            </div>
        </div>
        {/* section-2 */}
        <div className="flex gap-12 items-center justify-around">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Product Price</label>
                <input 
                type="text"
                id="price"
                value={values.price}
                onChange={handleChange}
                className='h-14 border-2 rounded-md outline-none px-2 placeholder:px-2 ' placeholder='enter product price' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Price Per Pices</label>
                <input 
                type="text"
                id="perpiece"
                value={values.perpiece }
                onChange={handleChange}
                className='h-14 border-2 rounded-md outline-none  px-2 'placeholder='enter product price' />
            </div>
        </div>
        {/* section-3 */}
        <div className="flex gap-12 items-center justify-around">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Item Code</label>
                <input
                 value={values.itemCode}
                 onChange={handleChange} 
                 type="number"
                 id="itemCode"
                 className='h-14 border-2 rounded-md outline-none px-2 'placeholder='enter Item Code' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">HSN Code</label>
                <input
                 value={values.hsnCode}
                 onChange={handleChange} 
                type="number" 
                id="hsnCode"
                className='h-14 border-2 rounded-md outline-none  px-2 ' placeholder='enter HSN Code' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Unit Of Measurement</label>
                <input
                 value={values.measurment}
                 onChange={handleChange} 
                 id="measurment"
                type="text" 
                className='h-14 border-2 rounded-md outline-none  px-2 ' placeholder='enter Unit Of Measurement' />
            </div>
        </div>
        {/* section-3 */}
        <div className="flex gap-12 items-center justify-around">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Corporate Discount</label>
                <input
                 type="text"
                 id="corporateDiscount"
                 value={values.corporateDiscount}
                 onChange={handleChange}
                 className='h-14 border-2 rounded-md outline-none px-2 ' placeholder='enter Corporate Discount' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Individual Discount</label>
                <input
                 type="text"
                 id="Individual_discount"
                 value={values.Individual_discount}
                 onChange={handleChange}
                 className='h-14 border-2 rounded-md outline-none  px-2 ' placeholder='enter Individual Discount' />
            </div>
        </div>
        {/* section-4 */}
        <div className="">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Select Product Variant</label>
                <Autocomplete
                sx={{ width: "100%" }}
                options={gym_equipment}
                renderInput={(params) => <TextField {...params} label="Select Variant" />}
                />
            </div>
        </div>
        {/* section-5 */}
        <div className="space-y-2">
            <label htmlFor="">Product Description</label>
        <TextField 
        value={values.mindiscription}
        onChange={handleChange}
        id="mindiscription" label="Description" variant="outlined" className='w-full' />
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
             <div
        className="border-2 cursor-pointer  text-center border-blue-500 text-blue-500 px-12 py-2 hover:text-white  duration-300 hover:bg-blue-400">
           <button type="submit">Add Product</button>
        </div>
        </div>
     </form >
    </div>
        </>
  )
}

export default AddProduct
