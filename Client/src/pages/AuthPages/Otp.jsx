import React, { useState } from 'react';

const OTPInput = ({ length, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));

  const handleChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(''));

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

  const handleChange = (value) => {
      setOtp(value);
      console.log(value)
};
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle OTP submission logic
    alert('Submitted OTP:', otp);
    window.location.href="/"
  };

  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="w-full max-w-md p-8 space-y-8 flex items-center justify-center flex-col bg-white rounded shadow">
        <h2 className="text-2xl font-bold text-center">Enter OTP</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <OTPInput length={6} onChange={handleChange} />
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPComponent;
