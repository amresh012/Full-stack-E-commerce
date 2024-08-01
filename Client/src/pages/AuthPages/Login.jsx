import React from 'react';
import {Link} from "react-router-dom"
import Logo from "../../assets/Untitled-1.png"
import { IoLockClosedOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import SocialAuthUI from '../../components/reusablesUI/SocialAuthUI';
import {useFormik} from "formik"
import axios from "axios"
import {toast, Toaster} from "react-hot-toast"



const Login = () => {
 
  var isLogo = true
  
  const {values, handleBlur , handleSubmit, handleChange} =  useFormik({
    initialValues:{
      emal:"",
      password:"",
    },
    onSubmit: async(values)=>{
     const res =  await axios.get("/api/user/check", values)
     toast.success("logged in successfully", res)

    }
  })







  // const handleShowPassword=()=> {
  //   var x = document.getElementById("password")
  //   // console.log(x.value)
  //  if(x.value===" ")
  //  {
  //    alert("No Password")
  //    return
  //  }
  //   if (x.type === "password") {
  //     x.type = "text";
  //   } else {
  //     x.type = "password";
  //   }
  // }

  return (
    <div className="min-h-[50vh] flex items-center justify-center p-4">
      <Toaster/>
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
        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
        <form onSubmit={handleSubmit}>
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
              value={values.email}
              onChange={handleChange}
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
              value={values.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border outline-none"
              required
            />
            {/* <div className="absolute right-3 top-3" onClick={handleShowPassword}>
             <FaEye/>
            </div> */}
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
