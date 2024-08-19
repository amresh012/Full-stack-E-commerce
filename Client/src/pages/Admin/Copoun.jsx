import { Autocomplete, TextField } from '@mui/material'
// import React,  from 'react'
import toast,{Toaster} from 'react-hot-toast'

const Copoun = () => {

  
  const copoun = [
    {id:1,label:"Copoun Code", placeholder:"Enter Copoun Code"},
    {id:2, label:"Discount Value" , placeholder:"Enter Discount value in range of 1-100"},
  ]

  const typeofDi = ["Fixed" , "Pecentage"]


  return (
    <>
      <Toaster />
      <div className='border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4'>
    <div className="text-3xl font-bold p-8 bg-[#038CCC] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Add Copouns</h1>
        </div>
    </div>
      <div className="border-2 m-4 mt-24 rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around   p-6">
        {/* Add copoun component */}
        <div className="flex gap-12 items-center justify-around">
          {copoun.map((item) => (
            <div className="input-1 w-full flex-col gap-2 flex" key={item.id}>
              <label htmlFor="">{item.label}</label>
              <input
                type="number"
                className="border-[1px] border-black/30 p-2 h-14 w-[20rem] rounded-[3px] focus:border-blue-500 outline-none focus:border-2"
                placeholder={item.placeholder}
              />
            </div>
          ))}
          <div className="w-[20rem] gap-2 flex flex-col">
            <label htmlFor="">Type:</label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={typeofDi}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Discount Type" />
              )}
            />
          </div>
        </div>
        <div
          className=" cursor-pointer  text-center 
           text-white rounded-md shadow-md px-12 py-2 
          duration-300 bg-[#038CCC] hover:bg-[#038CCC]/80"
        >
          <button>Generate Copoun</button>
        </div>
      </div>
    </>
  );
}

export default Copoun
