import React, { useEffect } from 'react'
import Logo from "../../assets/Untitled-1.png"
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

  useEffect(() => {
    AOS.init();
  }, [])


  return (
    <>
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
        <p className='text-white pt-2 text-xl'>We are one of the leading Fitness Equipment Brand in India. Head office located in Faridabad.</p>
        {/* button */}
        <button class="button mt-8" data-text="Awesome">
          <span class="actual-text">&nbsp;Our&nbsp;Clients&nbsp;</span>
          <span aria-hidden="true" class="hover-text">&nbsp;Our&nbsp;Clients&nbsp;</span>
        </button>
      </div>
    </div>
    <div className=" flex items-center justify-around gap-6 p-12">
      <div className="w-1/2">
      <h1 className='text-[2rem] font-bold font-["Roboto"] tracking-wider '>Leading Commercial Gym Setup Company in Delhi/NCR</h1>
        <p className='tracking-wider'><span className='text-red-500 font-bold  text-xl'>KFS Fitness</span> – offering Gym Setup Company in <span className='text-blue-500 font-bold'>Faridabad, Ghaziabad, Delhi, Noida, Gurugram</span> all over India. 
          Before building a commercial gym, it is important to define exactly what a commercial gym is and 
          if this is the type of gym you want to build. A commercial gym is a public gym equipment for most people.
           These are generally large spaces used by customers or members and intended for physical activity. 
           Training at a commercial gym is attractive because it offers a wide variety of exercise equipment,
            programs, and services that you may not have access to at home. A commercial gym, on the other hand, 
            is the place where you can achieve your fitness goals. These fitness studios are usually equipped with 
            durable professional fitness equipment that is designed for intensive use. Commercial gyms are also known for their various workout programs and classes and sometimes other amenities such as showers, lockers, saunas, massage chairs, swimming pools, basketball courts, etc.</p>
      </div>
      {/*  */}
      <div className="w-1/2 bg-blue-100 h-96">
      </div>
      </div>
    </>
  )
}

export default Home
