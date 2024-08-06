import React, { useState } from 'react'
import toast,{Toaster} from 'react-hot-toast'

const Copoun = () => {

  const [selected , setSelected] = useState()
  const handleCopoun = ()=>{
     toast.success("copoun code generated successfully")
  }



  return (
    <>
    <Toaster/>
    <div className='border-2 rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around lg:mx-24 p-6'>
        {/* Add copoun component */}
        <div className="flex gap-12 items-center justify-around">
        <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Copoun Code</label>
                <input type="number" className='h-12 border-2 rounded-md outline-none px-2 w-[20rem] ' placeholder='enter copoun code'/>
            </div>
          <div className="w-[20rem] flex flex-col">
            <label htmlFor="">Type:</label>
            <select name="" id="" className='w-[20rem]  p-4  outline-none border-2 rounded-md '>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
            </select>
          </div>
            <div className="input-1 w-full flex-col flex">
                <label htmlFor="">Discount Value</label>
                <input type="number" className='h-12 border-2 rounded-md outline-none  px-2 w-[20rem] ' placeholder='enter discount value' />
            </div>
        </div>
        <div
        onClick={handleCopoun}
        className="border-2 cursor-pointer  text-center border-blue-500 text-blue-500 px-12 py-2 hover:text-white  duration-300 hover:bg-blue-400">
           <button>Generate Copoun</button>
        </div>
    </div>
        </>
  )
}

export default Copoun
