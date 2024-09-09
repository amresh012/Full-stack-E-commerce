import React, { useCallback, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { adduser } from "../../features/authSlice";
const OTPInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(""));

    // Focus on next input
    if (value && index < length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          id={`otp-${index}`}
          type="text"
          maxLength="1"
          value={data}
          onChange={(e) => handleChange(e, index)}
          className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      ))}
    </div>
  );
};

const OTPComponent = () => {
  const [otp, setOtp] = useState(0);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = useCallback(
    (value) => {
      setOtp(value);
    },
    [setOtp]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const getotp = otp;

    try {
      const response = await fetch(`${base_url}otp/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: getotp,
          mobile: state?.mobile,
          email: state?.email,
        }),
      });
      const data = await response.json();
      console.log(data)

      if (!data.success) {
        throw new Error(data.message);
      }

      toast.success(data.message);
      if (data?.token) {
        localStorage.setItem("token", data.token);
        dispatch(adduser(data));
        navigate('/profile');
      } else {
        navigate("/reset-password", { state: { email: state?.email } });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-center items-center h-[50vh]">
        <div className="w-full max-w-md p-8 space-y-8 flex items-center justify-center flex-col bg-white rounded shadow">
          <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <OTPInput length={4} onChange={handleChange} />
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-[#144170] hover:bg-[#144170]/80 rounded-md focus:outline-none focus:bg-indigo-700"
              >
                Verify OTP
              </button>
              <div className="w-full mt-2 cursor-pointer grid place-items-center">
                <Link to="/">
                  <p className="underline text-[#0c0c0cdb]">Back to home</p>
                </Link>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OTPComponent;
