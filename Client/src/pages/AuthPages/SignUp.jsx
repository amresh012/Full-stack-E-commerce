/* eslint-disable no-unused-vars */
// src/Login.js
import {Link} from "react-router-dom"
import { CiMail } from "react-icons/ci";
import {FaRegUser } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import {useFormik} from "formik"
import {toast, Toaster} from "react-hot-toast"
import { useDispatch , useSelector } from "react-redux"
import {RegisterApi, addSignupdata, adduser} from "../../features/authSlice"
import { useState } from "react";

const SignUp = () => {
  const [error , setError] = useState("")
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.auth);
  console.log(authentication)

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      mobile: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await dispatch(RegisterApi(values));
        console.log(response)
        if (response.payload.success) {
          toast.success("Registration successful!");
          dispatch(addSignupdata(response.payload.data));
          dispatch(adduser(response.payload.data));
          setError("")
          // Redirect to login page or dashboard
           window.location.href="/login"
        } 
        else{
          setError(response.payload.message)
         }
      } catch (error) {
       
      } finally {
        setSubmitting(false);
      }
    }
  });

 
  return (
    <>
    <Toaster/>
    <div className="flex w-full mt-12 items-center justify-center">
      <div className="flex items-center  justify-center shadow-md rounded-md  overflow-clip w-fit ">

      <div className="image relative ">
        <img src="https://img.freepik.com/premium-photo/portrait-muscled-athlete-bodybuilder-workouts-alone-sport-gym-indoors_489646-18893.jpg?ga=GA1.1.1956989210.1720427934&semt=ais_hybrid" alt="" />
        <div className="absolute flex items-center justify-center bg-black/40 top-0 h-full w-full text-white">
         <h1 className="flex flex-col items-center justify-center text-center">
          <p className="text-[3rem] font-bold">Build your dream gym with us</p>
          <p className="text-[1.5rem]">Ultimate Fitness Equipment Brand</p>
          </h1>
        </div>
      </div>
      <div className="bg-white p-8 w-[30rem]  space-y-4">
      <div className="flex flex-col items-center justify-center ">
        <h1 className='text-4xl font-bold'>Create account</h1>
        <p className='text-xs'>or use your email to signin</p>
      </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-4 rounded overflow-hidden">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Name
            </label>
            <div className="relative flex ">
           <div className=" flex items-center justify-center  w-12  bg-[#038CCC] text-white  ">
              <FaRegUser/>
            </div>
           <input
              // type="text"
              id="name"
              value={values.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border outline-none h-12 relative"
              required
              />
           </div>
          </div>
          <div className="mb-4 rounded overflow-hidden ">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Email
            </label>
           <div className="relative flex ">
           <div className=" flex items-center justify-center text-xl w-12 bg-[#038CCC] text-white  ">
              <CiMail/>
            </div>
           <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border outline-none  relative"
              required
              />
           </div>
          </div>
          {/* number */}
          <div className="mb-4 rounded overflow-hidden ">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Mobile
            </label>
           <div className="relative flex ">
           <div className=" flex items-center justify-center  text-xl w-12 bg-[#038CCC] text-white  ">
              <CiPhone/>
            </div>
           <input
              type="text"
              id="mobile"
              value={values.mobile}
              onChange={handleChange}
              className="w-full px-3 py-2 border outline-none"
              required
              />
           </div>
          </div>
          {/* number-end */}
          <div className="mb-6 rounded overflow-hidden">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative flex ">
           <div className=" flex items-center justify-center  text-xl w-12 bg-[#038CCC] text-white   ">
              <IoLockClosedOutline/>
            </div>
           <input
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border outline-none  relative"
              required
              />
           </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#038CCC] text-white py-2 rounded font-medium hover:bg-[#038CCC]/80"
            >
            Create Account
          </button>
        </form>
        <div className="flex  items-center w-full gap-2 justify-center p-4">
          <p>Already Have Acount ?</p>
          <Link to="/login">
           <p className='text-blue-500 underline'>Login</p>
          </Link>
        </div>
              </div>
      </div>
    </div>
            </>
  );
};

export default SignUp;
