// import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { useSelector ,useDispatch } from "react-redux";
import { IoLockClosedOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import {useFormik ,Form} from "formik"
import {toast, Toaster} from "react-hot-toast"
import {LoginApi ,adduser} from "../../features/authSlice"
// import {useNavigate} from "react-router-dom"


const Login = () => {
  const dispatch = useDispatch();
const { values, errors, handleSubmit, handleReset, handleChange } = useFormik({
  initialValues: {
    email: '',
    password: '',
  },
  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  },
  onSubmit: async (values,{isSubmitting}) => {
    try {
      const response = await dispatch(LoginApi(values));
      console.log(response)
      if (response.payload.success) {
        toast.success("Registration successful!");
        dispatch(addSignupdata(response.payload.data));
        dispatch(adduser(response.payload.data));
        // Redirect to login page or dashboard
        // navigate('/profile')
         
      } else {
        throw new Error(response.data.error)
      }
    } catch (error) {
      toast.error(error.message);
    }
    finally{
      isSubmitting(true)
    }
  }
});

  return (
    <>
      <Toaster/>
    <div className=" flex  mt-12  items-around justify-center  rounded-md  overflow-clip ">
    <div className="image relative ">
        <img src="https://img.freepik.com/premium-photo/portrait-muscled-athlete-bodybuilder-workouts-alone-sport-gym-indoors_489646-18893.jpg?ga=GA1.1.1956989210.1720427934&semt=ais_hybrid" alt="" />
        <div className="absolute flex items-center justify-center bg-black/40 top-0 h-full w-full text-white">
         <h1 className="flex flex-col items-center justify-center text-center">
          <p className="text-[3rem] font-bold">Build your dream gym with us</p>
          <p className="text-[1.5rem]">Ultimate Fitness Equipment Brand</p>
          </h1>
        </div>
      </div>
      <div className="bg-[#0A2440] text-white p-8  w-[30rem]  space-y-4">
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className='text-4xl font-bold'>SignIn</h1>
        <p className='text-xs'>or use your account</p>
      </div>
        {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
        <form onSubmit={handleSubmit} >
          <div className="mb-4 ">
            <label className="block mb-2 text-sm font-bold" htmlFor="email">
              Email
            </label>
            <div className="relative flex max-h-fit ">
           <div className=" flex items-center justify-center  text-xl w-12 bg-[#038CCC] text-white ">
              <CiMail/>
            </div>
           <input
              type="email"
              id="email"
              value={values.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border outline-none text-black"
              required
            />
           </div>
          </div>
          <div className="mb-6 max-h-fit">
            <label className="block mb-2 text-sm font-bold " htmlFor="password">
              Password
            </label>
            <div className="relative flex  ">
           <div className=" flex items-center justify-center  text-xl w-12 bg-[#038CCC] text-white   ">
              <IoLockClosedOutline/>
            </div>
           <input
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border outline-none text-black"
              required
            />
          
           </div>
           <div className="py-2">
           <Link to="/forgot-password" >
           <p>Forget Password?</p>
           </Link>
           </div>
          </div>
          <button
            type="submit"
            className="w-full bg-white text-[#0c0c0cdb] hover:bg-[#144170] hover:text-white p-2 rounded-md duration-300"
          >
            SignIn
          </button>
        </form>
        <div className="flex  items-center w-full gap-2 justify-center p-4">
          <p>Dont&apos;t have account</p>
          <Link to="/Signup">
           <p className='text-[#038CCC]   underline'>SignIn</p>
          </Link>
        </div>
      </div>
    </div>
              </>
  );
};

export default Login;
