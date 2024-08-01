import React, { useEffect } from 'react'
import Logo from "../../assets/Untitled-1.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Bestsellers from '../Bestsellers';
import { Clients } from '../../constant';

const Home = () => {

  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <>
    <div className='h-[80vh] bg-black hero_section items-center justify-start flex'>
      <div className=" h-[30rem] w-[45rem] ml-4">
        <h1 className='flex items-center  gap-4 text-white text-2xl'>
          <p className='pt-1'>Welome to</p>
          <img src={Logo} alt="" className='h-12 ' />
        </h1>
        <div className="text-white font-bold capitalize text-[4rem] heading" data-aos="fade-in" data-aos-duration="900" >
          <h1>The Ultimate Fitness</h1>
          <h1>Equipment Brand</h1>
        </div>
        <p className='text-white pt-2 text-xl'>We are one of the leading Fitness Equipment Brand in India. Head office located in Faridabad.</p>
        {/* button */}
        <button class="button mt-8" data-text="Awesome">
          <span class="actual-text">&nbsp;Our&nbsp;Clients&nbsp;</span>
          <span aria-hidden="true" class="hover-text">&nbsp;Our&nbsp;Clients&nbsp;</span>
        </button>
      </div>
    </div>
{/*  secton-unknown */}
<div className="p-24  gap-12 flex flex-col">
  <div className="border-l-8 border-blue-500 px-2">
  <h1 className='text-[3rem] font-bold'>Range Of Products</h1>
  </div>
    <div className="">
    <div className="child-1 flex items-center gap-12">
      <div className="image-container ">
        <img
        className='' 
        src="https://energiefitness.in/cdn/shop/files/Cardio_227e805a-28fe-4413-b691-1caf0cb8e892.png?v=1702278684&width=750" alt="" />
      </div>
      <div className="space-y-12">
        <h1 className=' font-bold text-[3rem] Font-oswald'>Cardio</h1>
        <p className='text-xl leading-8 pr-12'>Boost endurance with our cutting-edge cardio machines at Energie Fitness.
           Elevate your fitness journey and achieve your goals with our advanced equipment lineup.
           </p>
        <div className="bg-[#1f1f21] w-fit p-4 text-white">
          <button>Buy Now</button>
        </div>
      </div>
     </div>
     {/* section-2 */}
     <div className="child-2 flex items-center gap-12">
      <div className="space-y-12">
        <h1 className=' font-bold text-[3rem] Font-oswald'>Strength</h1>
        <p className='text-xl leading-8 pr-12'>Boost endurance with our cutting-edge cardio machines at Energie Fitness.
           Elevate your fitness journey and achieve your goals with our advanced equipment lineup.
           </p>
        <div className="bg-[#1f1f21] w-fit p-4 text-white">
          <button>Buy Now</button>
        </div>
      </div>
      <div className="image-container ">
        <img
        className='' 
        src="https://energiefitness.in/cdn/shop/files/Strength_a90ed0bf-9929-4a27-b324-977c0ba0bfb4.png?v=1702278742&width=750" alt="" />
      </div>
     </div>
     {/* section-3 */}
     <div className="child-3 flex items-center gap-12">
      <div className="image-container ">
        <img
        className='' 
        src="https://energiefitness.in/cdn/shop/files/Accessories_c338a851-65b7-4d14-bbdf-19cb46080506.png?v=1702278778&width=750" alt="" />
      </div>
      <div className="space-y-12">
        <h1 className=' font-bold text-[3rem] Font-oswald'>Accessories</h1>
        <p className='text-xl leading-8 pr-12'>Boost endurance with our cutting-edge cardio machines at Energie Fitness.
           Elevate your fitness journey and achieve your goals with our advanced equipment lineup.
           </p>
        <div className="bg-[#1f1f21] w-fit p-4 text-white">
          <button>Buy Now</button>
        </div>
      </div>
     </div>
    </div>
   </div>
{/*  secton-unknown-end */}












    {/* best selling */}
      <div className="bestsellers flex flex-col   gap-12 mt-24 ">
      <div className="border-l-8 border-blue-500 px-2 mx-28  flex justify-between">
  <h1 className='text-[3rem] font-bold'>Best Selling Products</h1>
          <button className='bg-black/90 px-12 text-white'>View More</button>
  </div>
        <div className="flex items-center justify-center">
          <Bestsellers/>
        </div>
      </div>

  



{/* our clients */}
    {/* <div className="Our clients my-12">
      <h1 className='text-[3rem]  font-bold '>Our Clients</h1>
      <div className="client-infinite-scroll flex  flex-wrap justify-around ">
          {
            Clients.map((client)=>(
              <div className="flex items-center flex-col m-2 grayscale hover:grayscale-0 hover:shadow-md hover:scale-105  duraton-300 cursor-pointer" key={client.id}>
                <img src={client.imgurl} alt={client.location}  className='h-44'/>
                <span className=' font-bold'>{client.location}</span>
              </div>
            ))
          }
      </div>
    </div> */}
    {/* our client section end */}
    </>
  )
}

export default Home
