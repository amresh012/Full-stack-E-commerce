/* eslint-disable no-unused-vars */
// src/Login.js
import { Link } from "react-router-dom";
import { CiMail } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa6";
import { IoLockClosedOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RegisterApi, addSignupdata, adduser } from "../../features/authSlice";
import { useState } from "react";
import { config } from "../../Utils/axiosConfig";
import { base_url } from "../../Utils/baseUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    mobile: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const checkuserSignup = async (data) => {
    const response = await axios.post(`${base_url}user/check`, data, config);
    return response.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await checkuserSignup(formData);
      console.log(response)
      if (!response.error ) {
        dispatch(RegisterApi(formData));
        toast.success("Registration successful!");
        dispatch(addSignupdata(formData));

        navigate("/login");
      }
      else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex w-full lg:mt-12 items-center justify-center overflow-clip rounded-md lg:p-0 p-2">
        <div className="flex items-start justify-center shadow-md rounded-md h-full overflow-clip">
          <div className="image relative hidden lg:block ">
            <img
              src="https://img.freepik.com/premium-photo/portrait-muscled-athlete-bodybuilder-workouts-alone-sport-gym-indoors_489646-18893.jpg?ga=GA1.1.1956989210.1720427934&semt=ais_hybrid"
              alt=""
              className="rounded-l-md"
            />
            <div className="absolute flex items-center justify-center bg-black/40 top-0 h-full w-full text-white">
              <h1 className="flex flex-col items-center justify-center text-center">
                <p className="text-[3rem] font-bold">Build your dream gym with us</p>
                <p className="text-[1.5rem]">Ultimate Fitness Equipment Brand</p>
              </h1>
            </div>
          </div>
          <div className="bg-[#0A2440] text-white p-8 w-[30rem] space-y-[26px] rounded-r-md ">
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-4xl font-bold">Create account</h1>
              <p className="text-xs">or use your email to sign in</p>
            </div>
            <form method="post" onSubmit={handleSubmit} className="h-[100%]">
              <div className="mb-4 rounded overflow-hidden">
                <label className="block mb-2 text-sm font-bold" htmlFor="name">
                  Name
                </label>
                <div className="relative flex">
                  <div className="flex items-center justify-center w-12 bg-[#144170] text-white">
                    <FaRegUser />
                  </div>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border outline-none h-12 relative text-black"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 rounded overflow-hidden">
                <label className="block mb-2 text-sm font-bold" htmlFor="email">
                  Email
                </label>
                <div className="relative flex">
                  <div className="flex items-center justify-center text-xl w-12 bg-[#144170] text-white">
                    <CiMail />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border outline-none relative text-black"
                    required
                  />
                </div>
              </div>
              <div className="mb-4 rounded overflow-hidden">
                <label className="block mb-2 text-sm font-bold" htmlFor="mobile">
                  Mobile
                </label>
                <div className="relative flex">
                  <div className="flex items-center justify-center text-xl w-12 bg-[#144170] text-white">
                    <CiPhone />
                  </div>
                  <input
                    type="text"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border outline-none text-black"
                    required
                  />
                </div>
              </div>
              <div className="mb-6 rounded overflow-hidden">
                <label className="block mb-2 text-sm font-bold" htmlFor="password">
                  Password
                </label>
                <div className="relative flex">
                  <div className="flex items-center justify-center text-xl w-12 bg-[#144170] text-white">
                    <IoLockClosedOutline />
                  </div>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border outline-none relative text-black"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full duration-150 bg-white text-[#0c0c0cdb] hover:bg-[#144170] hover:text-white py-2 rounded font-medium"
              >
                Create Account
              </button>
            </form>
            <div className="flex items-center w-full gap-2 justify-center p-4">
              <p>Already Have Account?</p>
              <Link to="/login">
                <p className="text-blue-500 underline">Login</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
