import React, { useReducer } from 'react'
import {toast , Toaster} from "react-hot-toast"

const WebsitePage = () => {

    // const [state, dispatch] = useReducer(reducer, initialState);



// handle change functon
const handleChange = (event, value) => {
   toast.success("Website confgured successfully")
}

const handleSubmit= (e)=>{
    e.preventDefault()
   alert("reducer invoked")
}


const configlabel=[
    {
        id:0,
        label:"Website Main color",
    },
    {
        id:1,
        label:"Website Primary color ",
    },
    {
        id:2,
        label:"Secondary Main color",
    },
    {
        id:3,
        label:"Header color",
    },
    {
        id:4,
        label:"Footer color ",
    },
    {
        id:5,
        label:"Text color",
    },
    {
        id:6,
        label:"Add Website logo :",
        Id:"logo"
    },
    {
        id:7,
        label:"Banner Image",
        Id:"banner"
    },
    {
        id:8,
        label:"Add Website Name",
    },
    {
        id:9,
        label:"Add Website Title",
    }
]








  return (
    <>
    <Toaster/>
    <div className='border-2 rounded-md shadow-md  h-auto flex flex-col items-center justify-around mx-12 '>
        {/* section-1 */}
      <div className="text-3xl font-bold py-12">
        <h1>Website Configuration</h1>
      </div>
      {/* section-2 */}
      {/* form */}
      <form
      onSubmit={handleSubmit} 
      className='w-full h-full p-12 flex  flex-col gap-12'>
      <div className="flex gap-12 items-center justify-around w-full">
        {
            configlabel.slice(8).map((label)=>(
                <div key={label.id} className="input-1 w-full flex-col flex">
                <label htmlFor="">{label.label}:</label>
                <input type="text" className='h-12 border-2 rounded-md outline-none px-2 ' />
                </div>
            ))
        }
        </div>
        {/* section-3 */}
        <div className="flex gap-4 w-full p-4 ">
            {
               configlabel.slice(0,3).map((label)=>(
                   <div className="input-1 w-full flex-col flex" key={label.id}>
                <label htmlFor="">{label.label}:</label>
                <div className="flex  ">
                <input type="text" name="" id="" className='outline-none border-2 h-12 px-2 lg:w-fit w-full' />
                <input type="color" className='h-12 border-2  outline-none' />
                </div>
            </div>
               ))
            }
        </div>
        {/* section-4 */}
        <div className="flex gap-4 w-full  p-4  ">
            {
                configlabel.slice(3,6).map((label)=>(
                <div className="input-1 w-full flex-col flex" key={label.id}>
                <label htmlFor="">{label.label}:</label>
                <div className="flex  ">
                <input type="text" name="" id="" className='outline-none border-2 h-12 px-2  lg:w-fit w-full' />
                <input type="color" className='h-12 border-2  outline-none' />
                </div>
            </div>
               ))
            }
        </div>
        {/* section-5 */}
        <div className="flex gap-12 items-center justify-around w-full ">
       {
         configlabel.slice(6,8).map((item)=>(
            <div className="input-1 w-full flex-col flex">
            <label htmlFor="">{item.label}</label>
           <div className="flex items-center ">
            <button  type="file" className=' p-[9px] bg-gray-200 border-2 font-bold'>Choose File</button>
           <input type="file" className='h-11 border   outline-none px-2 ' />
           </div>
        </div>
         ))
       }
        </div>
        {/* section-6 */}
        <div
        onClick={handleChange} 
        className="border-2 w-full text-center border-blue-500 text-blue-500 px-12 py-2 hover:text-white  duration-300 hover:bg-blue-400">
           <button>Change Occurance</button>
        </div>
      </form>
    </div>
</>
  )
}

export default WebsitePage
