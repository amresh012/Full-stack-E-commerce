import React, { useState } from 'react';
import {toast, Toaster} from "react-hot-toast"
import axios from "axios"
import { base_url } from '../../Utils/baseUrl';

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
        console.error(error.response?.data?.message);
      }
  };

  return (
    <>
    <Toaster/>
    <div className="flex justify-center items-center ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
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
          <div className="Otp">
            
          </div>
        </form>
        {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      </div>
    </div>
                </>
  );
}

export default ForgotPassword;
