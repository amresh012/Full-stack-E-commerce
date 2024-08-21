// import React, { useState } from 'react';
import {Link} from "react-router-dom"
import { useSelector ,useDispatch } from "react-redux";
import { IoLockClosedOutline } from 'react-icons/io5';
import { CiMail } from 'react-icons/ci';
import {useFormik} from "formik"
import {toast, Toaster} from "react-hot-toast"
import {LoginApi ,adduser} from "../../features/authSlice"


const Login = () => {
    
  const dispatch = useDispatch();
// const history = useHistory();
const { values, errors, handleSubmit, handleChange } = useFormik({
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
      await dispatch(LoginApi(values));
      dispatch(adduser(values));
      toast.success('Logged in successfully!');
      window.location.href='/profile'; // redirect to dashboard
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  },
});

  return (
    <div className=" flex   items-around justify-center">
      <Toaster/>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
