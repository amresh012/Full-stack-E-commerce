import React, { useState } from 'react'
import {FaInstagram, FaTwitter, FaFacebook, FaYoutube, FaPinterest, FaTelegram} from "react-icons/fa"
import TextField from '@mui/material/TextField';
import {useFormik} from "formik"
import { base_url } from '../../Utils/baseUrl';
import toast, {Toaster } from 'react-hot-toast';
import axios from "axios"
const Contact = () => {

// Form Controll


const {values ,errors, handleBlur , handleSubmit , handleChange} = useFormik({
    initialValues:{
        fullname:"",
        email:"",
        mobile:"",
        reason:"",
        remarks:""
    },
    
    onSubmit: async(values, { setSubmitting }) => {
        try {
          const response = await axios.post(`${base_url}contact`, values);
          if(response.data.error){
            throw new Error(response.data.error)
          }
          else{
              toast.success(response.data.success);
          }
        } catch (error) {
            // console.log(typeof(error.message))
            toast.error(error.message)
        } finally {
          setSubmitting(false);
        }
      }
})

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
const formfield = [
    {
        id:"fullname",
        label:"Full Name",
        type:"text",
        email:"",
        fullname:values.fullname
    },
    {
        id:"mobile",
        label:"Monile No.",
        type:"text",
        mobile:values.mobile,
    },
    {
        id:"email",
        label:"Email",
        type:"email",
        email:values.email,
    }
]
    return (
    <>
    <Toaster/>
        <div className='h-screen flex flex-col gap-12 p-4 '>
            <div className="contact-header min-h-[50vh] bg-black/20 flex items-center w-full p-4">
                <div className="lg:h-32 flex items-start justify-center flex-col text-white lg:w-1/2 text-[2rem] uppercase lg:bg-white/20 ml-4 lg:backdrop-blur-md p-4">
                    <h1>KFS Fitness Contact us</h1>
                    <p className=' capitalize lg:text-base text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, magnam accusamus sapiente quae delectus!</p>
                </div>
            </div>
            {/* form section */}
            <div className="flex flex-col lg:flex-row items-start justify-around  lg:p-12 ">
                <div className="lg:w-1/2  ">
                 <div className="inner_child ">
                    <div className="heading lg:p-4 lg:text-left text-center">
                        <h1 className='lg:text-[3rem] lg:pt-12 text-[2rem] font-bold '>We are here to help you! To Setup your Dream Gym</h1>
                        <p className='leading-8 text-xl'>Are you dreaming of owning your own gym? Let us help you turn that dream into a reality. Our expert team can assist with everything from equipment selection to installation and setup. Contact us today to get started!</p>
                    </div>
                    <div className="body flex  gap-12  items-center justify-around leading-10 flex-wrap lg:p-12 py-12 ">
                        <div className="visit-us w-48  ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Visit-Us at:</h1>
                            <span className='lg:w-24 w-full  h-1 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            Kuber Tower, Ajronda, Sec- 20B 
                            Faridabad,
                            Haryana, India 121002
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48  ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Opening Hours:</h1>
                            <span className='lg:w-24 w-full h-1 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            Mon to Fri: 10:00 am — 05:00 pm
                            Sunday Closed
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48 ">
                            <div className="flex flex-col gap-2">
                            <h1 className='text-3xl font-bold '>Reach-Us at:</h1>
                            <span className='lg:w-24 w-full h-1 bg-blue-500 rounded-md'></span>
                            </div>
                            <p>
                            +91 9650 104 416
                            info@kfsfitness.com
                            </p>
                        </div>
                        {/*  */}
                        <div className="visit-us w-48 p-4 ">
                            <div className="flex flex-col gap-2 ">
                            <h1 className='text-3xl font-bold '>Follow-us On:</h1>
                            <span className='lg:w-24 w-full h-1 bg-blue-500 rounded-md'></span>
                            </div>
                           <div className="flex gap-4 py-4 text-xl flex-wrap">
                            {
                                socialMedia.map((media)=>(
                                    <div key={media.id} className="cursor-pointer ">
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
                <div className="lg:w-1/2 w-full p-4 flex flex-col bg-gray-100 space-y-12 mt-20 border-b-4 border-blue-500 shadow-md">
                  <div className="flex items-start mx-12 justify-around flex-col">
                  <h3 className='lg:text-3xl text-[20px] font-bold  text-center relative p-2'>Leave Us Your Message</h3>
                  <span className='h-1 lg:w-12 w-full bg-blue-500 rounded-md mx-2'></span>
                  </div>
                    <div class="">
                        <form className='w-full' onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-12">
                          {
                            formfield.map((feild)=>(
                               <div className="flex flex-col gap-2">
                                <label htmlFor={feild.label}>{feild.label.slice(0,10)}</label>
                                <input 
                                type={feild.type}
                                id={feild.id} 
                                value={values.value}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className='h-12  rounded-md border-2 bg-zinc-100 focus:bg-white focus:shadow-md outline-none px-2 focus:outline-blue-500'
                                />
                               </div>
                            )) }
                        </div>
                        <div className="mt-8 space-y-2">
                        <label htmlFor="Purpose">Purpose</label>
                        <select
                        id="reason"
                        onChange={handleChange}
                         className=' p-4 w-full bg-zinc-100 border-2 border-gray-300 rounded-md outline-none '>
                            <option value="Choose">Choose</option>
                            <option value="GYM Setup">GYM Setup</option>
                            <option value="Purpose">Purpose</option>
                        </select>
                        </div>
                        <textarea id="remarks" onChange={handleChange} placeholder='write your query here...'   className='mt-8 w-full outline-none  px-2 py-2 border-2 rounded-md resize-none no-scrollbar'></textarea>
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
                        <div className="flex mt-8 items-center justify-center active:scale-95 duration-300 gap-2 text-xl bg-blue-400 lg:w-fit p-4  text-white lg:mx-10 my-4">
                            <button type="submit" >Submit Now</button>
                            <FaTelegram/>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
           <div className="flex flex-col items-start gap-4 p-2 font-bold uppercase">
            <h1 className='text-2xl  underline'>Locate Us On Map</h1>
           <iframe 
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14039.640870357845!2d77.3111153!3d28.3917796!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdde1a0fb5695%3A0xe3495466a0f428ef!2sKFS%20Fitness%20(India&#39;s%20Most%20Trusted%20Fitness%20Equipment%20Brand)!5e0!3m2!1sen!2sin!4v1722591521134!5m2!1sen!2sin" 
            width="100%" height="450" 
            allowfullscreen="" 
            className=' '
            loading="lazy"
             referrerPolicy="no-referrer-when-downgrade">
             </iframe>
           </div>
        </div>
            </>
    )
}

export default Contact


