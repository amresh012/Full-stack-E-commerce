import React, { useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import axios from "axios"
import { base_url } from '../../Utils/baseUrl';
import Divider from "../../components/reusablesUI/Divider"
import { Link, useNavigate } from 'react-router-dom';
import { FaFingerprint } from 'react-icons/fa';

const ForgotPassword = ()=> {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success , setSuccess] = useState(false);
  const [gettingOtp, setGettingOtp] = useState(false);
  const navigate = useNavigate();

  const handleSubmit =async (e) => {
      e.preventDefault();
      try {
        setGettingOtp(true);
        const res=  await axios.post(`${base_url}otp/send`, { email });
        console.log(res)
        if(!res.data.success){
          throw new Error(res.data.message)
        }
        else{
          setSuccess(true)
          toast.success(`Your Otp has sent to your mail`);
          setMessage(`we sent code to ${email}`)
          }
        navigate('/otp', {state: {email}});
      } catch (error) {
        setMessage(error?.response?.data?.message || error.message || 'Something went wrong');
        setTimeout(() => {
          setMessage("")
        },5000)
      }
      finally{
        setGettingOtp(false);
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
              {message && <p className={success?"text-green-500 text-center p-2":"text-red-500 text-center p-2"}>{message}</p> }
            <button
            disabled={gettingOtp}
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#038CCC] rounded-md hover:bg-[#038CCC]/80 focus:outline-non focus:bg-[#038CCC] disabled:bg-[#bfbfbf] disabled:cursor-not-allowed"
            >
              {gettingOtp ? 'Getting OTP...' : 'Send Reset Link'}
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