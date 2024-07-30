// src/Login.js
import React, { useState } from 'react';
// import { auth } from './firebase';
import {Link} from "react-router-dom"
import Logo from "../../assets/Untitled-1.png"
import { IoLockClosedOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import { FaEye } from 'react-icons/fa6';
import SocialAuthUI from '../../components/reusablesUI/SocialAuthUI';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  var isLogo = true
  const handleLogin = async (e) => {
    e.preventDefault();
    alert("Login button Clicked")
  };

  const handleShowPassword=()=> {
    var x = document.getElementById("password")
    // console.log(x.value)
   if(x.value===" ")
   {
     alert("No Password")
     return
   }
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <div className="logo-container z-50 h-24 grid place-items-center">
        {isLogo ? (
          <Link to="/">
            <img src={Logo} alt="logo" className="" />
          </Link>
        ) : (
          <Link to="/">
            <p>Company Logo</p>
          </Link>
        )}
      </div>
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className='text-2xl font-bold'>SignIn</h1>
        <p className='text-xs'>or use your account</p>
      </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4 ">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
            <div className="relative flex  hover:shadow-md max-h-fit ">
           <div className=" flex items-center justify-center    text-xl w-12 bg-gray-200  ">
              <CiMail/>
            </div>
           <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border outline-none"
              required
            />
           </div>
          </div>
          <div className="mb-6 max-h-fit">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative flex  ">
           <div className=" flex items-center justify-center  text-xl w-12 bg-gray-200  ">
              <IoLockClosedOutline/>
            </div>
           <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border outline-none"
              required
            />
            <div className="absolute right-3 top-3" onClick={handleShowPassword}>
             <FaEye/>
            </div>
           </div>
           <div className="py-2">
           <Link to="/auth/forgot-password" >
           <p>Forget Password?</p>
           </Link>
           </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700"
          >
            SignIn
          </button>
        </form>
        <div className="flex  items-center w-full gap-2 justify-center p-4">
          <p>Dont't have account</p>
          <Link to="/auth/Signup">
           <p className='text-blue-500 underline'>SignIn</p>
          </Link>
        </div>
        <SocialAuthUI/>
      </div>
    </div>
  );
};

export default Login;
