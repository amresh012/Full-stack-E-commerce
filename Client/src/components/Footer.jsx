import React from 'react'
import Logo from './reusablesUI/Logo'
import { FaFacebook, FaInstagram, FaPinterest, FaTwitter, FaYoutube } from 'react-icons/fa'
import {Amex,Mastercard,Rupay,Visa}from "../assets/images"

const socialMedia = [
  {
   id:0,
   name:"Instageam",
   icon:<FaInstagram/>,
   link:""
  },
  {
   id:1,
   name:"Twitter",
   icon:<FaTwitter/>,
   link:""
  },
  {
   id:2,
   name:"Facebook",
   icon:<FaFacebook/>,
   link:""
  },
  {
   id:3,
   name:"Pintrest",
   icon:<FaPinterest/>,
   link:""
  },
  {
   id:4,
   name:"Youtube",
   icon:<FaYoutube/>,
   link:""
  }
]

const prod = ["Barbells & Plates" ,
  "Crossfit Equipments" ,
   "Home Gym Equipment",
   "Gym Accessories",
   "Cardio Machines",
   "Strength Training Equipment",
   "Gym Weights",
   "Multi Gym Machines",
   "Strength Training Machines"

  ]
const Footer = () => {
  return (
   <footer className=' bg-black w-full text-white flex flex-col'>
    <div className="h-12"></div>
    <div className="top-footer flex lg:flex-row  flex-col items-start around  border-b-2 lg:p-2 lg:m-4">
        <div className="p-4 space-y-4 child-1 lg:w-1/3 w-full  ">
            <Logo/>
            <p className=''>KFS FITNESS-
            Adding fuel to every fitness fanatic’s
             passion with the best equipment. Experts in setting home/commercial
              Gyms & CrossFit boxes PAN India.</p>
              <p className=''>Kuber Tower, Ajronda, Sec- 20B Faridabad,
              Haryana, India 121002</p>
              <div className="social-media flex gap-8 ">
              {
                  socialMedia.map((media)=>(
                    <div key={media.id} className="cursor-pointer ">
                        <span>{media.icon}</span>
                    </div>
                ))
                           
              }
              </div>
             </div>
             <div className="p-4 flex items-start justify-start flex-col">
              <h1 className='text-xl font-bold'>Shop</h1>
               <ul className="lg:h-56 cursor-pointer flex flex-col flex-wrap">
                {
                  prod.map((item, index) => (
                    <li className='p-2 hover:pl-2  hover:underline' key={index}>{item}</li>
                  ))
                }
               </ul>
             </div>
             {/* info */}
             <div className="p-4 flex items-start justify-start flex-col">
              <h1 className='text-xl font-bold'>Info</h1>
               <ul className="lg:h-[300px] cursor-pointer flex flex-col flex-wrap">
                {
                  prod.map((item, index) => (
                    <li className='p-2 hover:pl-2  hover:underline' key={index}>{item}</li>
                  ))
                }
               </ul>
             </div>
    </div>
    {/* calling */}

    <div className=" flex justify-between items-center lg:p-4 gap-4 p-8 cursor-pointer lg:flex-row flex-col-reverse  ">
     <ul className='flex lg:gap-12 items-center justify-around'>
      <li className="">Privacy Policy</li>
      <li className="">Terms & Conditions</li>
      <li className="">Refund Policy</li>
      <li className="">Shipping Policy</li>
     </ul>
     <div className="flex gap-8 items-center justify-center  cursor-pointer">
      <img src={Mastercard} alt="" className="h-10" />
      <img src={Rupay} alt="" className="h-6" />
      <img src={Amex} alt="" className="h-10" />
      <img src={Visa} alt="" className="h-10" />
     </div>
    </div>
   </footer>
  )
}

export default Footer
