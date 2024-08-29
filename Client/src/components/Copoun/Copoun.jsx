// components/CouponForm.js
import React, { useState } from 'react';
import axios from 'axios';
import {base_url} from "../../Utils/baseUrl"

const Coupon = ({ setDiscount }) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [success , setSuccess] =  useState(false)
  

  const validateCoupon = async () => {
    try {
      const response = await axios.post(`${base_url}coupon/validate`, { code: couponCode });
      if (response.data.coupon) {
        setDiscount(response.data.coupon.discountValue);
        setSuccess(true)
    }
    } catch (error) {
      setMessage('Invalid or expired coupon');
      setSuccess(false)
    }
  };

  const applyCopoun = async () => {
    try {
      const response = await axios.post(`${base_url}payment/couponcode`, { code: couponCode });
      console.log(response)
      if (response.data.coupon) {
        setDiscount(response.data.coupon.discountValue);
        setSuccess(true)
        setMessage('Coupon applied successfully');
        setTimeout(()=>{
            setMessage("")
        },5000)
    }
    } catch (error) {
      setMessage('Invalid or expired coupon');
      setSuccess(false)
    }
  };
  const handleCopoun = (e)=>{
    setCouponCode(e.target.value)
    validateCoupon()
  }

  return (
    <div className=" p-4 Copoun-Code rounded-md space-y-4">
    <div className=" space-y-2">
    <h1 className="text-2xl font-bold">Copoun Code</h1>
    <p className="some-text">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
      Perferendis recusandae accusamus dolor maiores.
    </p>
  </div>
  <div className="copoun-input flex flex-col gap-4 ">
    <input
      type="text"
      value={couponCode}
      onChange={handleCopoun}
      className={`h-12 rounded-full border px-4 placeholder:px-2 ${success ? "outline-green-500" : "outline-red-500"}`}
      placeholder="Enter your copoun code"
    />
    <button onClick={applyCopoun} className="bg-[#0A2440] text-white p-2 rounded-md">
      Apply Copoun
    </button>
    {message && 
    <p className='flex justify-center items-center w-full'>
        {
            success ?<span className='text-green-500 bg-green-200 p-2 rounded-md'>{message}</span>:<span className='text-red-500 p-2 bg-red-200 rounded-md'>{message}</span>
        }
    </p>
    }
  </div> 
      </div>
  );
};

export default Coupon;


