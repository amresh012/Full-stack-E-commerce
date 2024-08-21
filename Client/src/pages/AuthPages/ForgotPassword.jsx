import React, { useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import axios from "axios"
import { base_url } from '../../Utils/baseUrl';
import Divider from "../../components/reusablesUI/Divider"
import { Link } from 'react-router-dom';
import { FaFingerprint } from 'react-icons/fa';

const ForgotPassword = ()=> {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success , setSuccess] = useState(false)

  const handleSubmit =async (e) => {
      e.preventDefault();
      try {
        const res=  await axios.post(`${base_url}user/forgot-password-token`, { email });
        //  console.log(res)
        if(res.data.error){
          throw new Error(res.data.error)
        }
        else{
          setSuccess(true)
          toast.success(`Your Otp has sent to your mail`);
          setMessage(`we sent code to ${email}`)
          }
        setTimeout(() => {
            window.location.href = "/otp"
          },5000)
      } catch (error) {
        setMessage(error.message);
      }
  };

  return (
    <>
    <Toaster/>
    <div className="flex justify-center h-[80vh] items-center ">
      <div className="flex flex-col items-center  gap-2">
    <div className={success && "text-green-400"}>
         <FaFingerprint size={50}/>
        </div>
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <p className='text-center'>We get it, stuff happens. Just enter your email address below and we'llsend you a link to reset your password!</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
            <div>
              {message && <p className='text-italic text-center w-full p-2 text-red-500'>{message}</p> }
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#038CCC] rounded-md hover:bg-[#038CCC]/80 focus:outline-non focus:bg-[#038CCC]"
            >
              Send Reset Link
            </button>
          </div>
           <Divider/>
        </form>
        <div className="flex flex-col items-center justify-center text-blue-500  underline">
          <Link to="/SignUp">
           <p className="">Create Account!</p>
          </Link>
          <Link to="/login">
           <p className="">Already Have Account? Login!</p>
          </Link>
        </div>
      </div>
      </div>
    </div>
                </>
  );
}

export default ForgotPassword;
