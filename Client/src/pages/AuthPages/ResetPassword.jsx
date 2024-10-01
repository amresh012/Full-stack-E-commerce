import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Divider from '../../components/reusablesUI/Divider';
import { CgPassword } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";
import axios from 'axios'; // Add axios for API requests
import { base_url } from '../../Utils/baseUrl';

const ResetPassword = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const token = localStorage.getItem("token")
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      // Make the request to your API to update the password
      const response = await axios.put(`${base_url}user/reset-password/${token}`, password );
      if (!response.data.error) {
        setSuccess(true); // Show success message
        setMessage("Password has been updated successfully");
        setError(''); // Clear any previous errors
      }
      else{
        setError(response.data.error);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Error updating password");
    }
  };
  // original ==== $2b$10$32UX86yomDj.FD4b80y7juXrumXZ1ZUKaaWL3yEZ4FwXdPbO.rZ.a

  return (
   <>
    <div className="reset-password-container h-[70vh] w-full flex flex-col items-center justify-center ">
      <div className={success ? "text-green-500 mb-4" : "mb-4"}>
        {
          success ? <FaRegCheckCircle size={80}/> : <CgPassword size={80}/>
        }
      </div>
     <div className="flex flex-col gap-8 w-1/2 items-center">
     <div className="flex flex-col items-center">
     <h1 className='text-3xl font-bold tracking-wider'>Set New Password</h1>
     <p>must be 8 characters long</p>
     </div>
      <form onSubmit={handleSubmit} className="space-y-6 w-1/2 flex flex-col">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
             Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            {error && <p className='text-italic text-center w-full p-2 text-red-500'>{error}</p>}
            {message && <p className='text-italic text-center w-full p-2 text-green-500'>{message}</p>}
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-[#038CCC] rounded-md hover:bg-[#038CCC]/80 focus:outline-non focus:bg-[#038CCC]"
            >
              Reset Password
            </button>
          </div>
           <Divider/>
        </form>
     </div>
        <div className="flex flex-col items-center justify-center text-blue-500 underline">
          <Link to="/SignUp">
           <p className="">Create Account!</p>
          </Link>
          <Link to="/login">
           <p className="">Already Have Account? Login!</p>
          </Link>
        </div>
    </div>
   </>
  );
};

export default ResetPassword;
