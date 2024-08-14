// import React, { useState } from 'react';
import {Link} from "react-router-dom"
import Logo from "../../assets/Untitled-1.png"
import { IoLockClosedOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import {useFormik} from "formik"
import axios from "axios"
import {toast, Toaster} from "react-hot-toast"
import { base_url } from '../../Utils/baseUrl';
import { useState } from "react";



const Login = () => {
  const [isLogo, setIsLogo] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const {values, errors, handleBlur,handleSubmit , handleChange} = useFormik({
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
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await axios.post(`${base_url}user/login`, values);

        if (res.status === 200) {
          toast.success('Logged in successfully! You will be redirected to the dashboard.');
          localStorage.setItem("token" , res.data.token)
          setTimeout(() => {
            window.location.href = '/profile';
          },3000)
        } else {
          toast.error('Invalid credentials');
        }
      } catch (error) {
        console.error(error);
        toast.error('An error occurred. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });



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
          
           </div>
           <div className="py-2">
           <Link to="/forgot-password" >
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
          <p>Dont&apos;t have account</p>
          <Link to="/Signup">
           <p className='text-blue-500 underline'>SignIn</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
