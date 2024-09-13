import React, { useEffect, useState, useRef } from 'react';
import ProductPage from './Product/ProductPage';
import { IoIosClose } from "react-icons/io";
import { base_url } from '../Utils/baseUrl';
import axios from 'axios';
import {toast, Toaster} from 'react-hot-toast';

const CommercialGym = () => {
  const [openModel , setOpenModel] =  useState(false);
  const [QuoteProduct , setQuoteProduct] = useState();
  const [prod , setProd] = useState(null);
  const modalRef = useRef(null); // Use ref to reference modal

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    mobile: "",
    desc: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${base_url}quot`, formData);
      if (response.data.error) {
        throw new Error(response.data.error);
      } else {
        toast.success(response.data.success);
        setOpenModel(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onClickhandler = (id) => {
    setOpenModel(true); // Open modal
    setQuoteProduct(id);

    // Scroll to the modal
    setTimeout(() => {
      modalRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100); // Small delay to ensure modal is rendered
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${base_url}product/${QuoteProduct}`);
        const data = await response.json();
        setProd(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [QuoteProduct]);

  return (
    <>
      <Toaster />
      <div className="comercial-page min-h-[40vh] bg-black/20 flex items-center w-full p-4">
        <div className=" flex items-start justify-center flex-col text-white lg:w-1/2 text-[2rem] uppercase lg:bg-white/20 ml-4 lg:backdrop-blur-md p-4">
          <h1>KFS Fitness Commercial Gym Setup</h1>
          <p className="capitalize lg:text-base text-xs">
            Get in touch with us for personalized support and inquiries about our fitness equipment and services to Setup Your Gym.
          </p>
        </div>
      </div>
      {/* product list */}
      <div className="w-full flex items-center justify-center ">
        <ProductPage buttonProp="Get A Quote" filtervisible={false} onClickhandler={onClickhandler}/>
      </div>

      {openModel && (
        <div ref={modalRef} className="fixed z-50 inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div> {/* Background overlay */}
          <div className="relative bg-white shadow-2xl shadow-black rounded-md w-[40rem]  p-4">
            <div className="relative p-2 flex items-center justify-center w-full bg-[#0a2444] text-white text-xl">
              <p>Quotation Form</p>
              <span onClick={() => setOpenModel(false)} className="cursor-pointer absolute right-0 bg-red-500 h-full w-12 flex items-center justify-center">
                <IoIosClose />
              </span>
            </div>
            <div className="w-full p-2">
              <div className="flex">
                <div className="image w-[10rem] h-[8rem] bg-gray-100">
                  <img src={prod?.images} alt="product image" className="h-full w-full object-cover"/>
                </div>
                <div className="w-[30rem] bg-gray-100 space-y-2 p-2">
                  <h1 className="uppercase text-xl font-bold">{prod?.name?.slice(0, 20)}...</h1>
                  <p className="text-sm">{prod?.mindiscription?.slice(0, 100)}...</p>
                  <p>Price ₹<span>{prod?.price}</span></p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col py-4">
              <div className="flex flex-col p-4">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} className="border-2 w-full h-10 placeholder:px-2 outline-none px-2" placeholder="Enter Your full name" required />
              </div>
              <div className="flex flex-col p-4">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} className="border-2 w-full h-10 placeholder:px-2 outline-none px-2" placeholder="Enter Your Email address" required />
              </div>
              <div className="flex flex-col p-4">
                <label htmlFor="city">City</label>
                <input type="text" id="city" value={formData.city} onChange={handleChange} className="border-2 w-full h-10 placeholder:px-2 outline-none px-2" placeholder="Enter Your City name" required />
              </div>
              <div className="flex flex-col p-4">
                <label htmlFor="mobile">Mobile</label>
                <input type="text" id="mobile" value={formData.mobile} onChange={handleChange} className="border-2 w-full h-10 placeholder:px-2 outline-none px-2" placeholder="Enter Your Mobile Number" required />
              </div>
              <div className="px-3 flex items-start flex-col justify-start">
                <label htmlFor="desc">Message</label>
                <textarea id="desc" value={formData.desc} onChange={handleChange} placeholder="write your query here..." className="w-full outline-none px-2 py-2 border-2 rounded-md resize-none no-scrollbar"></textarea>
              </div>
              <div className="bg-[#0a2444] mx-4 mt-10 text-xl font-bold w-fit px-12 py-2 text-white">
                <button type="submit">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CommercialGym;
