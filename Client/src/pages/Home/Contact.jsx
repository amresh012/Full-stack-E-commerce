import React from 'react'
import {FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaPinterest, FaTelegram} from "react-icons/fa"
import TextField from '@mui/material/TextField';
const Contact = () => {


const socialMedia = [
   {
    id:0,
    name:"Instageam",
    icon:<FaInstagram/>,
    link:"",
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
const label=["Full Name" , "Mobile No. 10* Digit" , "Email Address"]


    return (
        <div className='h-screen flex flex-col gap-12'>
            <div className="contact-header min-h-[50vh] flex items-center w-full p-4">
                <div className="h-32 flex items-start justify-center flex-col text-white w-1/2 text-[2rem] uppercase bg-white/20 ml-4 backdrop-blur-md p-4">
                    <h1>KFS Fitness Contact us</h1>
                    <p className=' capitalize text-base'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, magnam accusamus sapiente quae delectus!</p>
                </div>
            </div>
            {/* form section */}
            <div className="flex flex-collg:flex-row items-start justify-around gap-12 p-12">
                <div className="lg:w-1/2 ">
                 <div className="inner_child ">
                    <div className="heading p-4">
                        <h1 className='text-[3rem] pt-12'>We are here to help you! To Setup your Dream Gym</h1>
                        <p className='leading-8 text-xl'>Are you dreaming of owning your own gym? Let us help you turn that dream into a reality. Our expert team can assist with everything from equipment selection to installation and setup. Contact us today to get started!</p>
                    </div>
                    <div className="body flex  gap-2 leading-10 flex-wrap">
                        <div className="visit-us w-48 m-12 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Visit-Us at:</h1>
                            <span className='lg:w-24 w-full  h-2 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            Kuber Tower, Ajronda, Sec- 20B 
                            Faridabad,
                            Haryana, India 121002
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48 m-12 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Opening Hours:</h1>
                            <span className='w-20 h-1 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            Mon to Fri: 10:00 am — 05:00 pm
                            Sunday Closed
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48 m-12 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Reach-Us at:</h1>
                            <span className='w-24 h-2 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            +91 9650 104 416
                            info@kfsfitness.com
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48 m-12 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Follow-us On:</h1>
                            <span className='w-24 h-2 bg-blue-500 rounded-md'></span>
                            </div>
                           <div className="flex gap-4 py-4 text-xl">
                            {
                                socialMedia.map((media)=>(
                                    <div key={media.id} className="cursor-pointer">
                                        <span className=''>{media.icon}</span>
                                        <span className='text-xs'>{media.name}</span>
                                    </div>
                                ))

                            }
                            </div>
                        </div>
                    </div>  
                 </div>
                </div>

                {/* form section */}
                <div className="lg:w-1/2 p-2 grid place-items-center bg-gray-100 space-y-12 mt-20 border-b-4 border-blue-500 shadow-md">
                  <div className="flex items-start mx-12 justify-around flex-col">
                  <h3 className='text-3xl text-center relative p-2'>Leave Us Your Message</h3>
                  <span className='h-2 w-12 bg-red-500 rounded-md mx-2'></span>
                  </div>
                    <div class="container">
                       <form className=''>
                        <div className="flex flex-col gap-12">
                          {
                            label.map((label)=>(
                               <div className="flex flex-col gap-2">
                                <label htmlFor={label}>{label}</label>
                                 <TextField id="outlined-basic" label={label} variant="outlined" />
                               </div>
                            ))
                          }
                        </div>
                       <div className="mt-8 space-y-2">
                        <label htmlFor="Purpose">Purpose</label>
                        <select name="Choose" className=' p-4 w-full bg-zinc-100 border-2 border-gray-300 rounded-md outline-none '>
                            <option value="">Choose</option>
                            <option value="">GYM Setup</option>
                            <option value="">Purpose</option>
                        </select>
                       </div>
                        <textarea placeholder='write your query here...' cols={90}  className='mt-8 outline-none  px-2 py-2 border-2 rounded-md resize-none no-scrollbar'></textarea>
                        <div className="space-y-4 mt-8">
                            <h1 className='pl-8 text-xl'>Address</h1>
                            <div className="flex gap-12 items-center justify-around">
                            <div className="flex items-start gap-2 flex-col">
                                <label htmlFor="city">City</label>
                                <TextField id="outlined-basic" label="city" variant="outlined" />
                            </div>
                            <div className="flex items-start gap-2 flex-col">
                                <label htmlFor="city">State</label>
                                <TextField id="outlined-basic" label="city" variant="outlined" />
                            </div>
                            </div>
                        </div>
                        <div className="flex mt-8 items-center gap-2 text-xl bg-blue-400 w-fit p-4 text-white mx-10 my-4">
                            <button type="submit">Submit Now</button>
                            <FaTelegram/>
                        </div>
                       </form>
                    </div>
                </div>
            </div>
           <div className="">
            <h1 className='text-2xl pl-12 underline'>Locate Us On Map</h1>
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14039.640870357845!2d77.3111153!3d28.3917796!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdde1a0fb5695%3A0xe3495466a0f428ef!2sKFS%20Fitness%20(India&#39;s%20Most%20Trusted%20Fitness%20Equipment%20Brand)!5e0!3m2!1sen!2sin!4v1722591521134!5m2!1sen!2sin" 
            width="100%" height="450" 
            allowfullscreen="" 
            className='p-4 '
            loading="lazy"
             referrerPolicy="no-referrer-when-downgrade">
             </iframe>
           </div>
        </div>
    )
}

export default Contact
