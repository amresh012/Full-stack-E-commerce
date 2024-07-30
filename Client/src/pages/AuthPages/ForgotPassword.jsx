import React, { useState } from 'react';

const ForgotPassword = ()=> {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle forgot password logic (e.g., send reset link to the email)
    setMessage('If an account with that email exists, a password reset link has been sent.');
    window.location.href="/auth/otp"
  };

  return (
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
        {message && <p className="mt-4 text-center text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
