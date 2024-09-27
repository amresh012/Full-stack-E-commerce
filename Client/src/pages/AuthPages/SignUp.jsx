// /* eslint-disable no-unused-vars */
// // src/Login.js

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
  const navigate = useNavigate();
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
      if (!response.error) {
        const res = await dispatch(RegisterApi(formData));
        localStorage.setItem("id", res.payload._id);
        toast.success("Registration successful!");
        dispatch(addSignupdata(formData));
        navigate("/login");
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex w-full mt-12 mb-12 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-center w-full max-w-5xl overflow-hidden">
          {/* Image section */}
          <div className="relative hidden h-[36.5rem] lg:block w-full lg:w-1/2">
            <img
              src="https://img.freepik.com/premium-photo/portrait-muscled-athlete-bodybuilder-workouts-alone-sport-gym-indoors_489646-18893.jpg?ga=GA1.1.1956989210.1720427934&semt=ais_hybrid"
              alt="Gym Equipment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
              <h1 className="text-center space-y-2">
                <p className="text-2xl lg:text-3xl xl:text-4xl font-bold">Build your dream gym with us</p>
                <p className="text-lg lg:text-xl">Ultimate Fitness Equipment Brand</p>
              </h1>
            </div>
          </div>
          {/* Form section */}
          <div className="bg-[#0A2440] text-white w-full lg:w-1/2 px-6 py-8 sm:px-8 md:px-10 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl lg:text-3xl font-bold">Create account</h1>
              <p className="text-xs mt-1">or use your email to sign in</p>
            </div>
            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="name">Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center px-3 bg-[#144170] text-white">
                    <FaRegUser />
                  </span>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 border outline-none text-black rounded"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center px-3 bg-[#144170] text-white">
                    <CiMail />
                  </span>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 border text-black outline-none rounded"
                    required
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2" htmlFor="mobile">Mobile</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center px-3 bg-[#144170] text-white">
                    <CiPhone />
                  </span>
                  <input
                    type="text"
                    id="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 border text-black outline-none rounded"
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-bold mb-2" htmlFor="password">Password</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center px-3 bg-[#144170] text-white">
                    <IoLockClosedOutline />
                  </span>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-2 border text-black outline-none rounded"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded bg-white text-[#0A2440] font-medium hover:bg-[#144170] hover:text-white duration-150"
              >
                Create Account
              </button>
            </form>
            <div className="flex items-center justify-center gap-2">
              <p>Already have an account?</p>
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




















// import { Link } from "react-router-dom";
// import { CiMail } from "react-icons/ci";
// import { FaRegUser } from "react-icons/fa6";
// import { IoLockClosedOutline } from "react-icons/io5";
// import { CiPhone } from "react-icons/ci";
// import { toast, Toaster } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { RegisterApi, addSignupdata, adduser } from "../../features/authSlice";
// import { useState } from "react";
// import { config } from "../../Utils/axiosConfig";
// import { base_url } from "../../Utils/baseUrl";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SignUp = () => {
//   const navigate = useNavigate()
//   const dispatch = useDispatch();

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     mobile: '',
//   });

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const checkuserSignup = async (data) => {
//     const response = await axios.post(`${base_url}user/check`, data, config);
//     return response.data;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await checkuserSignup(formData);
//       console.log(response)
//       if (!response.error ) {
//         const res = await dispatch(RegisterApi(formData));
//         localStorage.setItem("id", res.payload._id)
//         toast.success("Registration successful!");
//         dispatch(addSignupdata(formData));

//         navigate("/login");
//       }
//       else {
//         throw new Error(response.error);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   return (
//     <>
//       <Toaster />
//       <div className="flex w-full lg:mt-12 mb-12 items-center justify-center overflow-clip ">
//         <div className="flex items-start justify-center shadow-md  h-full overflow-clip">
//           <div className="image relative hidden lg:block ">
//             <img
//               src="https://img.freepik.com/premium-photo/portrait-muscled-athlete-bodybuilder-workouts-alone-sport-gym-indoors_489646-18893.jpg?ga=GA1.1.1956989210.1720427934&semt=ais_hybrid"
//               alt=""
//               className=""
//             />
//             <div className="absolute flex items-center justify-center bg-black/40 top-0 h-full w-full text-white">
//               <h1 className="flex flex-col items-center justify-center text-center">
//                 <p className="text-[3rem] font-bold">Build your dream gym with us</p>
//                 <p className="text-[1.5rem]">Ultimate Fitness Equipment Brand</p>
//               </h1>
//             </div>
//           </div>
//           <div className="bg-[#0A2440] text-white w-[30rem]   space-y-[26px] ">
//             <div className="flex flex-col items-center justify-center">
//               <h1 className="text-4xl font-bold">Create account</h1>
//               <p className="text-xs">or use your email to sign in</p>
//             </div>
//             <form method="post" onSubmit={handleSubmit} className="h-[100%]">
//               <div className="mb-4 rounded overflow-hidden">
//                 <label className="block mb-2 text-sm font-bold" htmlFor="name">
//                   Name
//                 </label>
//                 <div className="relative flex ">
//                   <div className="flex items-center justify-center w-12 bg-[#144170] text-white">
//                     <FaRegUser />
//                   </div>
//                   <input
//                     type="text"
//                     id="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border outline-none h-12 relative text-black"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mb-4 rounded overflow-hidden">
//                 <label className="block mb-2 text-sm font-bold" htmlFor="email">
//                   Email
//                 </label>
//                 <div className="relative flex">
//                   <div className="flex items-center justify-center text-xl w-12 bg-[#144170] text-white">
//                     <CiMail />
//                   </div>
//                   <input
//                     type="email"
//                     id="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border outline-none relative text-black"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mb-4 rounded overflow-hidden">
//                 <label className="block mb-2 text-sm font-bold" htmlFor="mobile">
//                   Mobile
//                 </label>
//                 <div className="relative flex">
//                   <div className="flex items-center justify-center text-xl w-12 bg-[#144170] text-white">
//                     <CiPhone />
//                   </div>
//                   <input
//                     type="text"
//                     id="mobile"
//                     value={formData.mobile}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border outline-none text-black"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="mb-6 rounded overflow-hidden">
//                 <label className="block mb-2 text-sm font-bold" htmlFor="password">
//                   Password
//                 </label>
//                 <div className="relative flex">
//                   <div className="flex items-center justify-center text-xl w-12 bg-[#144170] text-white">
//                     <IoLockClosedOutline />
//                   </div>
//                   <input
//                     type="password"
//                     id="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full px-3 py-2 border outline-none relative text-black"
//                     required
//                   />
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full duration-150 bg-white text-[#0c0c0cdb] hover:bg-[#144170] hover:text-white py-2 rounded font-medium"
//               >
//                 Create Account
//               </button>
//             </form>
//             <div className="flex items-center w-full gap-2 justify-center p-4">
//               <p>Already Have Account?</p>
//               <Link to="/login">
//                 <p className="text-blue-500 underline">Login</p>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default SignUp;
