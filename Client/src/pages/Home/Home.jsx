import React, { useEffect } from 'react'
import Logo from "../../assets/Untitled-1.png"
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <div className='h-[80vh] bg-black/70 hero_section items-center justify-start flex'>
      <div className=" h-[30rem] w-[45rem] ml-4">
        <h1 className='flex items-center  gap-4 text-white text-2xl'>
          <p className='pt-1'>Welome to</p>
          <img src={Logo} alt="" className='h-12 ' />
        </h1>
        <div className="text-white font-bold capitalize text-[4rem] heading" data-aos="fade-in" data-aos-duration="900" >
          <h1>The Ultimate Fitness</h1>
          <h1>Equipment Brand</h1>
        </div>
        <p className='text-white pt-2'>We are one of the leading Fitness Equipment Brand in India. Head office located in Faridabad.</p>
        {/* button */}
        <button class="button mt-8" data-text="Awesome">
          <span class="actual-text">&nbsp;Our&nbsp;Clients&nbsp;</span>
          <span aria-hidden="true" class="hover-text">&nbsp;Our&nbsp;Clients&nbsp;</span>
        </button>
      </div>
    </div>
  )
}

export default Home
