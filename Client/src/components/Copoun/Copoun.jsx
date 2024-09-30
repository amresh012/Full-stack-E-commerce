// components/CouponForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {base_url} from "../../Utils/baseUrl"
import { config } from '../../Utils/axiosConfig';
import toast, { Toaster } from 'react-hot-toast';

const Coupon = ({ setDiscount, setDiscountType }) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [success , setSuccess] =  useState(false)
  

  const validateCoupon = async () => {
    try {
      const response = await axios.post(`${base_url}coupon/validate`, { code: couponCode });
      console.log(response)
      if (response.data.coupon) {
        setDiscount(response.data.coupon.discountValue);
        setDiscountType(response.data.coupon.discountType);
        setSuccess(true)
        setMessage('Valid Copoun');
    }
    } catch (error) {
      setMessage('Invalid or expired coupon');
      setSuccess(false)
    }
  };

  const applyCoupon = async () => {
    if (!couponCode) {
      setMessage("Please enter a coupon code");
      setSuccess(false);
      return;
    }
    try {
      const response = await axios.post(`${base_url}coupon/apply`, { code: couponCode }, config);
      console.log(response)
      if (response.data.success) {
        setDiscount(response.data.cart.isCouponApplied.discountValue);
        setSuccess(true);
        setMessage(response?.data?.message);
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } 
    } catch (error) {
      // console.log(error)
       toast.error(error.response?.data?.error || "Something went wrong")
       setSuccess(false);
    }
  };
  
  // Handle the coupon input change
  const handleCopoun = (e) => {
    setCouponCode(e.target.value);
  };

  useEffect(()=>{
      if(couponCode){
        validateCoupon()
      };
  },[couponCode])
  

  return (
    <>
    <Toaster/>
    <div className=" p-4 Copoun-Code rounded-md space-y-4">
    <div className=" space-y-2">
    <h1 className="text-2xl font-bold uppercase">Copoun Code</h1>
    <p className="some-text capitalize">
    Get more value! Apply your coupon code for an additional discount on our premium products.
    </p>
  </div>
  <div className="copoun-input flex flex-col gap-2 ">
    <input
      type="text"
      value={couponCode}
      onChange={handleCopoun}
      onBlur={()=>setMessage("")}
      className={`h-12 rounded-full border px-4 placeholder:px-2 ${success ? "outline-green-500" : "outline-red-500"}`}
      placeholder="Enter your copoun code"
    />
     {message && 
    <p className='w-full text-center'>
        {success ?<span className='text-green-500'>{message}</span>:<span className='text-red-500'>{message}</span>}
    </p>
    }
    <button onClick={applyCoupon} className="bg-[#0A2440] text-white p-2 rounded-md">
      Apply Copoun
    </button>
  </div> 
      </div>
    </>
  );
};

export default Coupon;


