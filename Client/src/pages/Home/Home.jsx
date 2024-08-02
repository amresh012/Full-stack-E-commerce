import React, { useEffect } from 'react'
import Logo from "../../assets/Untitled-1.png"
import AOS from 'aos';
import 'aos/dist/aos.css';
import Bestsellers from '../Bestsellers';
import { Clients } from '../../constant';
import Footer from '../../components/Footer';

const Home = () => {

  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <>
    <div className='h-screen bg-black/50 hero_section items-center justify-start flex'>
      <div className=" h-[30rem] w-[45rem] ml-4">
        <h1 className='flex items-center  gap-4 text-white text-2xl'>
          <p className='pt-1'>Welome to</p>
          <img src={Logo} alt="" className='h-12 ' />
        </h1>
        <div className="text-white font-bold capitalize text-[4rem] heading" data-aos="fade-in" >
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
    {/* best selling */}
      <div className="bestsellers flex flex-col   gap-12 mt-24 ">
      <div className="border-l-8 border-blue-500 px-2 mx-28  flex justify-between">
       <h1 className='text-[3rem] font-bold'>Best Selling Products</h1>
          <button className='bg-black/90 hover:bg-black/50 px-12 text-white duration-300'>View More</button>
         </div>
        <div className="flex items-center justify-center">
          <Bestsellers/>
        </div>
      </div>

      {/*  secton-unknown */}
<div className="p-24  gap-12 flex flex-col">
  <div className="border-l-8 border-blue-500 px-2">
  <h1 className='text-[3rem] font-bold'>Range Of Products</h1>
  </div>
    <div className="">
    <div className="child-1 flex items-center gap-12 " data-aos="fade-down">
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
     <div className="child-2 flex items-center gap-12" data-aos="fade-left">
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
     <div className="child-3 flex items-center gap-12" data-aos="fade-right">
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

  {/*facility seting section  */}
  <div className="h-[60vh] bg-zinc-200 flex flex-col  items-center justify-center gap-12">
  <div className="font-bold text-[3rem] Font-oswald flex items-center justify-around   flex-col gap-4">
    <h1>Why KFS Fitness?</h1>
    <p className='text-xl w-1/2 text-center tracking-wider font-light'>We constantly embrace innovation in our products each time we 
      bring you something new, or in upgrades, to our exisiting product line.
    </p>
  </div>
  <div className="flex justify-center px-24 gap-12 items-center cursor-pointer">
    <div className="flex items-center gap-4 hover:border-b-4 border-blue-500 duration-75 " data-aos="zoom-out">
    <div className="image">
      <img src="https://cdn.shopify.com/s/files/1/0264/6900/7383/files/Quality.svg?v=1631514936" alt="" className='h-44' />
    </div>
    <div className="">
      <h1 className='Font-oswald font-bold trackingg-wider'>1.Consult</h1>
      <p className=''>We start with a need analysis to understand your unique and specific requirements & preferences.
     </p>
    </div>
    </div>
    {/* 2 */}
    <div className="flex items-center gap-4 hover:border-b-4 border-blue-500 duration-75" data-aos="zoom-out">
    <div className="image">
      <img src="https://cdn.shopify.com/s/files/1/0264/6900/7383/files/Quality.svg?v=1631514936" alt="" className='h-44' />
    </div>
    <div className="">
      <h1 className='Font-oswald font-bold trackingg-wider'>1.Consult</h1>
      <p className=''>We start with a need analysis to understand your unique and specific requirements & preferences.
     </p>
    </div>
    </div>
    {/* 3 */}
    <div className="flex items-center gap-4 hover:border-b-4 border-blue-500 duration-75" data-aos="zoom-out">
    <div className="image">
      <img src="https://cdn.shopify.com/s/files/1/0264/6900/7383/files/Quality.svg?v=1631514936" alt="" className='h-44' />
    </div>
    <div className="">
      <h1 className='Font-oswald font-bold trackingg-wider'>1.Consult</h1>
      <p className=''>We start with a need analysis to understand your unique and specific requirements & preferences.
     </p>
    </div>
    </div>
  </div>
 </div>



{/* our clients */}
    <div className="Our clients my-12 flex flex-col gap-12 items-start px-12">
    <div className="border-l-8 border-blue-500 px-2" data-aos="fade-right">
  <h1 className='text-[3rem] font-bold'>Our Clients</h1>
  </div>
      <div className="client-infinite-scroll flex  flex-wrap justify-around ">
          {
            Clients.map((client)=>(
              <div className="flex 
              items-center flex-col m-2 grayscale hover:grayscale-0 duraion-300 hover:scale-105 
               duraton-300 cursor-pointer" key={client.id}>
                <img src={client.imgurl} alt={client.location}   data-aos="zoom-in"  className='h-44'/>
                <span className=' font-bold'>{client.location}</span>
              </div>
            ))
          }
      </div>
    </div>
    {/* our client section end */}
    {/* <Footer/> */}
    </>
  )
}

export default Home
