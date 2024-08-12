import React from 'react'
import {Kfs_logo, blob1 ,blob2} from "../../assets/images"
const HomePage = () => {
  return (

   <>
     <div className="bannerimg h-24 flex items-center justify-center text-2xl bg-black text-white">
        <h1>Banner Images</h1>
     </div>

     {/* <div className="herosection flex h-[100vh]">
        <div className="left-content bg-black w-1/2"></div>
        <div className="carousal w-1/2">

        </div>
     </div> */}

     {/* we offer */}
     <div className="h-screen flex">
      <div className="left-content w-1/2  border-2 p-4">
        <h1>We Are KFS</h1>
        <div className="">
          <h1 className='text-4xl font-bold'>We Give Shapes to Your Dream</h1>
          <p className="text-medium tracking-wider leading-8">
          KFS Fitness : Gym Setup Company in Faridabad. 
          Taking pride in creating high-quality gym equipment that 
          is designed to help you achieve your fitness goals. 
          We have a wide range of gym equipment that will cater to your needs.
          </p>
          <div className="flex justify-around gap-12 items-center w-full p-2">
            <div className="flex items-center flex-col text-xl uppercase font-bold gap-4 hover:border-b-2 border-blue-500">
              <img src="/weightlifting.png" alt="" className="h-24 grayscale hover:grayscale-0 " />
              <span>Best Design</span>
            </div>
            <div className="flex items-center  flex-col text-xl uppercase font-bold gap-4 hover:border-b-2 border-blue-500">
              <img src="/gr.png" alt="" className="h-24 grayscale hover:grayscale-0" />
              <span>Modern Equipments</span>
            </div>
            <div className="flex items-center flex-col  uppercase font-bold gap-4 hover:border-b-2 border-blue-500">
              <img src="/fitness.png" alt="" className="h-24 grayscale hover:grayscale-0" />
              <span>Body Building Machine</span>
            </div>
          </div>
        </div>
      </div>
      {/* right-content */}
      <div className="right-content w-fit">
        <img src="https://kfsfitness.com/wp-content/uploads/2023/07/v12-Squat.webp" alt="" />
      </div>
     </div>
   </>
  )
}

export default HomePage
