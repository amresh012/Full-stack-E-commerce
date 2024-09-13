// components/CouponForm.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {base_url} from "../../Utils/baseUrl"
import { config } from '../../Utils/axiosConfig';
import toast from 'react-hot-toast';

const Coupon = ({ setDiscount, setDiscountType }) => {
  const [couponCode, setCouponCode] = useState('');
  const [message, setMessage] = useState('');
  const [success , setSuccess] =  useState(false)
  

  const validateCoupon = async () => {
    try {
      const response = await axios.post(`${base_url}coupon/validate`, { code: couponCode });
      // console.log(response)
      if (response.data.coupon) {
        setDiscount(response.data.coupon.discountValue);
        setDiscountType(response.data.coupon.discountType);
        setSuccess(true)
        setMessage('Valid Copoun');
        toast.success("Copoun Applied Successfully")
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
      const response = await axios.post(`${base_url}payment/couponcode`, { code: couponCode }, config);
      console.log(response)
      // Check if coupon is successfully applied
      if (response.data.cart?.isCouponApplied) {
        setDiscount(response.data.cart.isCouponApplied.discountValue);
        setSuccess(true);
        setMessage("Coupon applied successfully!");
        // Clear the message after 5 seconds
        setTimeout(() => {
          setMessage("");
        }, 5000);
      } else {
        setMessage("Failed to apply the coupon.");
        setSuccess(false);
      }
    } catch (error) {
      // Handle error response from the server
      if (error.response && error.response.data) {
        console.log(error.response && error.response.data)
        setMessage(error.response.data.message);
      } else {
        setMessage("Network or server error. Please try again.");
      }
      setSuccess(false);
    }
  };
  
  // Handle the coupon input change
  const handleCopoun = (e) => {
    setCouponCode(e.target.value);
  };

  useEffect(()=>{
      validateCoupon();
  },[couponCode])
  

  return (
    <div className=" p-4 Copoun-Code rounded-md space-y-4">
    <div className=" space-y-2">
    <h1 className="text-2xl font-bold">Copoun Code</h1>
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
  );
};

export default Coupon;


