import React from 'react'
import {Kfs_logo, blob1 ,blob2} from "../../assets/images"
const HomePage = () => {
  return (

    <>
    <div className='h-[50vh]   flex items-start mt-12 justify-between px-4 '>
      <div className="left-content w-1/2 flex flex-col  items-start justify-center gap-4 ">
        <div className="flex items-center  gap-2">
          <h1 className='pt-2 font-bold'>Welcome to</h1>
          <img src={Kfs_logo} alt="logo" className='h-8' />
        </div>
        {/*  */}
        <div className="text-[4rem] font-bold tracking-wider">
          <p>Ultimate Fitness </p>
          <p>Equipment Brand</p>
        </div>
        <p className='text-xl'>We are one of the leading Fitness Equipment Brand in India. Head office located in Faridabad.</p>
        <div className="button bg-slate-950 hover:bg-slate-900 cursor-pointer text-white p-4 w-fit font-bold rounded-md">
          <button>Discover More</button>
        </div>
      </div>
      {/* right -content */}
      <div className="h-full  w-1/2 "></div>
    </div>


    {/* bestsellers */}
     
    </>
  )
}

export default HomePage
