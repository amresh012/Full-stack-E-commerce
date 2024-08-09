import React, { useState } from 'react'
import toast,{Toaster} from 'react-hot-toast'

const Copoun = () => {

  const [selected , setSelected] = useState()
  const handleCopoun = (e,i)=>{
    console.log(e,i)
  }
 
  const copoun = [
    {id:1,label:"Copoun Code", placeholder:"Enter Copoun Code"} , {id:2, label:"Discount Value" , placeholder:"Enter Discount value in range of 1-100"},
  ]


  return (
    <>
    <Toaster/>
    <div className='border-2 mt-24  rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around   p-6'>
        {/* Add copoun component */}
        <div className="flex gap-12 items-center justify-around">
        {
          copoun.map((item)=>(
            <div className="input-1 w-full flex-col flex" key={item.id}>
            <label htmlFor="">{item.label}</label>
            <input
             type="number"
              
              className='h-12 border-2 rounded-md outline-none px-2 w-[20rem] '
               placeholder={item.placeholder}/>
        </div>
          ))
        }
          <div className="w-[20rem] flex flex-col">
            <label htmlFor="">Type:</label>
            <select name="" id="" className='w-[20rem]  p-4  outline-none border-2 rounded-md '>
              <option value="Percentage">Percentage</option>
              <option value="Fixed">Fixed</option>
            </select>
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
