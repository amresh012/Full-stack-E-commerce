import React from 'react'
import { IoSettingsOutline } from "react-icons/io5";

const Setting = () => {

  const handleSubmit= (e)=>{
    e.preventDefault()
    alert("form submitted successfully")
  }
  return (
    <div className='border-2  rounded-md  mx-4 b-white'>
      <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
       <div className="bg-[#144170] p-2 text-white rounded-full"><IoSettingsOutline/></div>
        <h1 className='uppercase'>Profile Settings</h1>
      </div>
      {/* feilds */}
      <div className="p-4">
        <form onSubmit={handleSubmit}  className="space-y-4">
        <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Name:</label>
                <input 
                type="text"
                id="name"
                className='h-14 border-2 rounded-md outline-none px-2 ' 
                placeholder='enter  name' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Email:</label>
                <input type="text"
                 id="category" 
                 className='h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2' placeholder='enter Email'
                  />
            </div>
        </div>
        <div className="flex justify-around items-center gap-12">
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Mobile Number:</label>
                <input 
                type="text"
                id="name"
                className='h-14 border-2 rounded-md outline-none px-2 ' 
                placeholder='enter Mobile Number' />
            </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">GST NUMBER:</label>
                <input type="text"
                 id="category" 
                 className='h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2' placeholder='enter category'
                  />
            </div>
        </div>
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">PAN NO:</label>
                <input type="text"
                 id="subcategory" 
                 className='h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2' placeholder='enter PAN NO'
                  />
            </div>
            <div
             className="px-12 py-2 bg-[#144170] w-fit font-bold  cursor-pointer
            hover:bg-[#144170]/80 text-white duration-500
            ">
              <button type='submit' className='uppercase'>Update Profile</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Setting
