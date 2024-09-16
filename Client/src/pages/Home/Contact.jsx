import React, { useEffect, useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaPinterest,
  FaTelegram,
} from "react-icons/fa";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
const Contact = () => {
  const [suppotdata , setSupportData] =  useState([])

  const token = localStorage.getItem("token")
  const { values, errors, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      purpose: "",
      description: "",
    },

    onSubmit: async (values, { setSubmitting }) => {
      if(!token)
      {
        toast.error("Please Login First")
        return
      }
      try {
        const response = await axios.post(`https://crmkfsbackend.deepmart.shop/api/support/create-support`, values);
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
          toast.success(response.data.success);
        }
      } catch (error) {
        // 
        toast.error(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });



    const socialMedia = [
    {
      id: 0,
      name: "Instageam",
      icon: <FaInstagram />,
      link: "",
    },
    {
      id: 1,
      name: "Twitter",
      icon: <FaTwitter />,
      link: "",
    },
    {
      id: 2,
      name: "Facebook",
      icon: <FaFacebook />,
      link: "",
    },
    {
      id: 3,
      name: "Pintrest",
      icon: <FaPinterest />,
      link: "",
    },
    {
      id: 4,
      name: "Youtube",
      icon: <FaYoutube />,
      link: "",
    },
  ];
  const formfield = [
    {
      id: "name",
      label: "Full Name",
      type: "text",
      email: "",
      fullname: values.name,
    },
    {
      id: "mobile",
      label: "Mobile No.",
      type: "text",
      mobile: values.mobile,
    },
  ];
  return (
    <>
      <Toaster />
      <div className=" flex flex-col gap-12">
        <div className="contact-header min-h-[50vh] bg-black/20 flex items-center w-full p-4">
          <div className="lg:h-32 flex items-start justify-center flex-col text-white lg:w-1/2 text-[2rem] uppercase lg:bg-white/20 ml-4 lg:backdrop-blur-md p-4">
            <h1>KFS Fitness Contact us</h1>
            <p className=" capitalize lg:text-base text-xs">
            Get in touch with us for personalized support and inquiries about our fitness equipment and services.
            </p>
          </div>
        </div>
        {/* form section */}
        <div className="flex flex-col lg:flex-row items-start justify-around px-4 lg:pl-2 lg:pr-0 lg:p-12 ">
          <div className="lg:w-1/2  ">
            <div className="inner_child ">
              <div className="heading lg:p-4 lg:text-left text-center">
                <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
                  We are here to help you! To Setup your Dream Gym
                </h1>
                <div className="mx-auto mt-2 rounded-md h-[6px] w-[320px] bg-[#0a2440]"></div>
                <p className="mt-5 text-lg font-light">
                  Are you dreaming of owning your own gym? Let us help you turn
                  that dream into a reality. Our expert team can assist with
                  everything from equipment selection to installation and setup.
                  Contact us today to get started!
                </p>
              </div>
              <div className="body gap-12 space-y-4 px-3 justify-start flex-wrap py-12 ">
                <div className="visit-us">
                  <div className="flex flex-col gap-2">
                    <h1 className="uppercase text-[#0a2440] text-xl lg:text-3xl font-bold">
                      Visit-Us at:
                    </h1>
                  </div>
                  <p className="mt-2">
                    Kuber Tower, Ajronda, Sec- 20B Faridabad, Haryana, India
                    121002
                  </p>
                </div>
                {/*  */}
                <div className="visit-us">
                  <div className="flex flex-col gap-2">
                    <h1 className="uppercase text-[#0a2440] text-xl lg:text-3xl font-bold">
                      Opening Hours:
                    </h1>
                  </div>
                  <p className="mt-2">
                    Mon to Fri: 10:00 am — 05:00 pm Sunday Closed
                  </p>
                </div>
                {/*  */}
                <div className="visit-us">
                  <div className="flex flex-col gap-2">
                    <h1 className="uppercase text-[#0a2440] text-xl lg:text-3xl font-bold">
                      Reach-Us at:
                    </h1>
                  </div>
                  <p className="mt-2">+91 9650 104 416 info@kfsfitness.com</p>
                </div>
                {/*  */}
                <div className="visit-us">
                  <div className="flex flex-col gap-2 ">
                    <h1 className="uppercase text-[#0a2440] text-xl lg:text-3xl font-bold">
                      Follow-us On:
                    </h1>
                  </div>
                  <div className="flex gap-4 py-4 text-xl flex-wrap mt-2">
                    {socialMedia.map((media) => (
                      <div key={media.id} className="cursor-pointer ">
                        <span className="">{media.icon}</span>
                        <span className="text-xs">{media.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* form section */}
          <div className="lg:w-1/2 w-full p-4 flex flex-col bg-gray-100 space-y-12  border-b-4 border-[#0a2440] shadow-md">
            <div className="flex items-start mx-12 justify-around flex-col">
              <h1 className="w-full uppercase text-center text-[#0a2440] text-2xl lg:text-3xl font-bold">
                Leave Us Your Message
              </h1>
              <div className="mx-auto mt-2 rounded-md h-[6px] w-[220px] bg-[#0a2440]"></div>
            </div>
            <div>
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-12">
                  {formfield.map((feild, ind) => (
                    <div key={ind} className="flex flex-col gap-2">
                      <label htmlFor={feild.label}>
                        {feild.label.slice(0, 10)}
                      </label>
                      <input
                        type={feild.type}
                        id={feild.id}
                        value={values.value}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className="h-12  rounded-md border-2 bg-zinc-100 focus:bg-white focus:shadow-md outline-none px-2 focus:outline-blue-500"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-2">
                  <label htmlFor="Purpose">Purpose</label>
                 <select
                    id="purpose"
                    onChange={handleChange}
                    className=" p-4 w-full bg-zinc-100 border-2 border-gray-300 rounded-md outline-none "
                  >
                    <option value="Choose" selected>Choose</option>
                    <option value="gym setup">GYM Setup</option>
                    <option value="service">Service</option>
                    <option value="complaint">Complaint</option>
                  </select>
                 </div>
                <textarea
                  id="description"
                  onChange={handleChange}
                  placeholder="write your query here..."
                  className="mt-8 w-full outline-none  px-2 py-2 border-2 rounded-md resize-none no-scrollbar"
                ></textarea>
                {/* <div className="space-y-4 mt-8">
                  <h1 className="pl-8 text-xl">Address</h1>
                  <div className="flex gap-12 items-center justify-around">
                    <div className="flex items-start gap-2 flex-col">
                      <label htmlFor="city">City</label>
                      <TextField
                        id="outlined-basic"
                        label="city"
                        variant="outlined"
                      />
                    </div>
                    <div className="flex items-start gap-2 flex-col">
                      <label htmlFor="city">State</label>
                      <TextField
                        id="outlined-basic"
                        label="city"
                        variant="outlined"
                      />
                    </div>
                  </div>
                </div> */}
                <div className="flex mt-8 items-center justify-center active:scale-95 duration-300 gap-2 text-xl bg-[#0a2440] lg:w-fit p-4  text-white lg:mx-10 my-4">
                  <button type="submit">Submit Now</button>
                  <FaTelegram />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start p-2 font-bold uppercase">
          <h1 className="w-full text-3xl text-center font-bold text-[#0a2440]">
            Locate Us On Map
          </h1>
          <div className="mx-auto mt-2 rounded-md h-[6px] w-[220px] bg-[#0a2440]"></div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14039.640870357845!2d77.3111153!3d28.3917796!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdde1a0fb5695%3A0xe3495466a0f428ef!2sKFS%20Fitness%20(India&#39;s%20Most%20Trusted%20Fitness%20Equipment%20Brand)!5e0!3m2!1sen!2sin!4v1722591521134!5m2!1sen!2sin"
            width="100%"
            height="450"
            allowFullScreen=""
            className="mt-5"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
