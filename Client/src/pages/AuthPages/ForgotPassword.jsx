import React, { useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import axios from "axios"
import { base_url } from '../../Utils/baseUrl';
import Divider from "../../components/reusablesUI/Divider"
import { Link } from 'react-router-dom';

const ForgotPassword = ()=> {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit =async (e) => {
      e.preventDefault();
      try {
        await axios.post(`${base_url}api/user/forgot-password-token`, { email });
        toast.success('Password reset email sent');
        setMessage('Password reset email sent');
      } catch (error) {
        toast.error('Error sending password reset email');
        setMessage('Error sending password reset email');
        // console.error(error.response?.data?.message);
      }
  };

  return (
    <>
    <Toaster/>
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
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
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Send Reset Link
            </button>
          </div>
           <Divider/>
        </form>
        <div className="flex flex-col items-center justify-center text-blue-500 text-xl underline">
          <Link to="/auth/SignUp">
           <p className="">Create Account!</p>
          </Link>
          <Link to="/auth/login">
           <p className="">Already Have Account? Login!</p>
          </Link>
        </div>
        {/* {message && <p className="mt-4 text-center text-red-600">{message}</p>} */}
      </div>
    </div>
                </>
  );
}

export default ForgotPassword;
