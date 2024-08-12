import React, { useState } from 'react'
import { FaAddressCard } from "react-icons/fa6";
import {toast , Toaster}from "react-hot-toast"
import { base_url } from '../../Utils/baseUrl';
import axios from 'axios';
import {useFormik} from "formik"
const Shipping = () => {
   
  const {values , handleChange  , handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
      pincode: '',

    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await axios.post(`${base_url}user/adr`, values,);
        if(response.data.error){
          throw new Error(response.data.error)
        }
        else{
            toast.success(response.data.success);
        }
      } catch (error) {
        toast.error(error.response.data.message)
        setError(error.response.data.message)
      } finally {
        setSubmitting(false);
      }
    }
  });
 
  return (

    <>
    <Toaster/>
    <div className='border-2 h-[60vh] mt-12 shadow-md w-[70vw] b-white'>
       <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
       <div className="bg-blue-500 p-2 text-white rounded-full"><FaAddressCard/></div>
        <h1>Add New Address</h1>
      </div>
      {/* address form */}
      <div className="p-4">
        <form onChange={handleSubmit}   className="space-y-4">
        <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Full Name:</label>
                <input 
                value={values.name}
                onChange={handleChange}
                type="text"
                id="name"
                className='h-14 border-2 rounded-md outline-none px-2 ' 
                placeholder='enter  name' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Mobile NO:</label>
                <input type="text"
                value={values.mobile}
                onChange={handleChange}
                 id="mobile" 
                 className='h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2' placeholder='enter mobile no'
                  />
            </div>
        </div>
        <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Address:</label>
                <input 
                type="text"
                value={values.address}
                onChange={handleChange}
                id="address"
                className='h-14 border-2 rounded-md outline-none px-2 ' 
                placeholder='enter Mobile Number' />
            </div>
        </div>
        <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">CITY:</label>
                <input 
                type="text"
                id="city"
                value={values.city}
                onChange={handleChange}
                className='h-14 border-2 rounded-md outline-none px-2 ' 
                placeholder='enter  name' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">STATE:</label>
                <input type="text"
                 id="state" 
                 value={values.state}
                 onChange={handleChange}
                 className='h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2' placeholder='enter Email'
                  />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">POSTAL CODE:</label>
                <input type="text"
                 id="pincode" 
                 value={values.pincode}
                 onChange={handleChange}
                  className='h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2' placeholder='enter Email'
                 />
            </div>
        </div>
            <div
             className="border-blue-500 border-2 px-12 py-2 w-fit font-bold  cursor-pointer
             hover:bg-blue-500 hover:text-white duration-500
             ">
              <button type='submit' className='uppercase'>Update Address</button>
            </div>
        </form>
      </div>
    </div>

    <div className="border-2 h-[60vh] mt-12 shadow-md w-[70vw] b-white">
    <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
       <div className="bg-blue-500 p-2 text-white rounded-full"><FaAddressCard/></div>
        <h1>Old Addresses</h1>
      </div>
      <div className="p-4 ">
         <div className="border-2  p-4 h-24 rounded-md shadow-md   flex items-center gap-4">
           <input type="radio" name="" id="" />
           <div className="addr">
             <div className="flex gap-2">
              <p>Full Name</p>
              <p className="">Mobile No</p>
             </div>
             <div className="flex gap-2">
              <span className="">Address</span>
              <span className="">City</span>
              <span className="">State</span>
              <span className="">Postal Code</span>
             </div>
           </div>
         </div>
      </div>
    </div>
              </>
  )
}

export default Shipping
