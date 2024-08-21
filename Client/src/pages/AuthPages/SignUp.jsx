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

const SignUp = () => {
  const dispatch = useDispatch();
  const authentication = useSelector((state) => state.user);
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
        await registerUser(values);
         addSignupdata(values);
         adduser(values)
        handleSuccess();
      } catch (error) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const registerUser = async (values) => {
    dispatch(RegisterApi(values));
  };

  const handleSuccess = () => {
    toast.success('Registered Successfully');
    window.location.href = '/login';
  };

  const handleError = (error) => {
    console.log(error)
    toast.error('An error occurred while signing up.');
    console.error(error);
  };

 
  return (
    <>
    <Toaster/>
    <div className="min-h-[50vh]  flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md ">
      <div className="flex flex-col items-center justify-center mt-4">
        <h1 className='text-2xl font-bold'>Create account</h1>
        <p className='text-xs'>or use your email to signin</p>
      </div>
        <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              Name
            </label>
            <div className="relative flex ">
           <div className=" flex items-center justify-center  w-12  bg-gray-200  ">
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
           <div className=" flex items-center justify-center    text-xl w-12 bg-gray-200  ">
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
           <div className=" flex items-center justify-center    text-xl w-12 bg-gray-200  ">
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
          <div className="mb-6">
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="password">
              Password
            </label>
            <div className="relative flex ">
           <div className=" flex items-center justify-center   text-xl w-12 bg-gray-200  ">
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
            className="w-full bg-blue-500 text-white py-2 rounded font-medium hover:bg-blue-700"
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
        {/* <SocialAuthUI/> */}
      </div>
    </div>
            </>
  );
};

export default SignUp;
