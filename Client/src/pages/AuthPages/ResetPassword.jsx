import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Divider from '../../components/reusablesUI/Divider';
import { CgPassword } from "react-icons/cg";
import { FaRegCheckCircle } from "react-icons/fa";

const ResetPassword = () => {

  const [success , setSuccess] = useState(0)

  const handleSubmit = (e)=>{
      e.preventDefault()
      setSuccess(!success)
  }
  return (
   <>
    <div className="reset-password-container h-[70vh] w-full flex flex-col items-center justify-center ">
      <div className={success && "text-green-500 mb-4"}>
        {
          success ?<FaRegCheckCircle size={80}/> :<CgPassword size={80}/>
        }
      </div>
     <div className="flex flex-col  gap-8 w-1/2 items-center">
     <div className="flex flex-col items-center">
     <h1 className='text-3xl font-bold tracking-wider'>Set New  Password</h1>
     <p>must be 8 charaters long</p>
     </div>
      <form onSubmit={handleSubmit}  className="space-y-6 w-1/2   flex flex-col">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
             Confirm Password
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                required
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>
            <div>
              {/* {message && <p className='text-italic text-center w-full p-2 text-red-500'>{message}</p> } */}
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
        <div className="flex flex-col items-center justify-center text-blue-500  underline">
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