// import React, { useState } from 'react'
// import { IoSettingsOutline } from "react-icons/io5";
// import {ProfileResetApi} from "../../features/userSlice"
// import {useDispatch} from "react-redux"
// import {toast, Toaster} from "react-hot-toast"
// const Setting = () => {
//   const dispatch = useDispatch()
//   const [formData, setFormData] = useState(
//     {
//       name: null,
//       email: null,
//       mobile:null,
//       gstNo:null,
//       panNo:null

//     }
//   )

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     });
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//       const hasValue = Object.values(formData).some(
//         (field) => field !== "" && field !== null
//     );
//       if (!hasValue) {
//         toast.error("Please fill at least one field to update the profile.");
//         return;
//       }
//     try {
//     const res = await dispatch(ProfileResetApi(formData))
//     console.log(res)
//     if (res.type === "userprofile/fulfilled") {
//       toast.success("Profile Updated Successfully");
//       }
//    }
//     catch (error) {
//       console.log(error)
//       toast.error("Profile not Updated Please try again");
//    }
//   }
//   // handleResetForm
//   const HandleRestForm = ()=>{
//     setFormData({
//       name: "",
//       email: "",
//       mobile:"",
//       gstNo:"",
//       panNo:""
//   })
// }
//   return (
//     <>
//     <Toaster/>
//     <div className="border-2  rounded-md  mx-4 b-white">
//       <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
//         <div className="bg-[#144170] p-2 text-white rounded-full">
//           <IoSettingsOutline />
//         </div>
//         <h1 className="uppercase">Profile Settings</h1>
//       </div>
//       {/* feilds */}
//       <div className="p-4">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex justify-around items-center gap-12">
//             <div className="input-1 w-full flex-col flex">
//               <label htmlFor="">Name:</label>
//               <input
//                 type="text"
//                 id="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="h-14 border-2 rounded-md outline-none px-2 "
//                 placeholder="enter  name"
//                 />
//             </div>
//             <div className="input-1 w-full flex-col flex">
//               <label htmlFor="">Email:</label>
//               <input
//                 type="text"
//                 id="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
//                 placeholder="enter Email"
//                 />
//             </div>
//           </div>
//           <div className="flex justify-around items-center gap-12">
//             <div className="input-1 w-full flex-col flex">
//               <label htmlFor="">Mobile Number:</label>
//               <input
//                 type="text"
//                 id="mobile"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 className="h-14 border-2 rounded-md outline-none px-2 "
//                 placeholder="enter Mobile Number"
//               />
//             </div>
//             <div className="input-1 w-full flex-col flex">
//               <label htmlFor="">GST NUMBER:</label>
//               <input
//                 type="text"
//                 id="gstNo"
//                 value={formData.gstNo}
//                 onChange={handleChange}
//                 className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
//                 placeholder="enter gstNo (optional)"
//                 />
//             </div>
//           </div>
//           <div className="input-1 w-full flex-col flex">
//             <label htmlFor="">PAN NO:</label>
//             <input
//               type="text"
//               id="panNo"
//               value={formData.panNo}
//               onChange={handleChange}
//               className="h-14 border-2 rounded-md placeholder:px-2 outline-none  px-2"
//               placeholder="enter PAN NO (optional)"
//               />
//           </div>
//          <div className="flex gap-2">
//          <div
//             className="px-12 py-2 bg-[#144170] w-fit font-bold  cursor-pointer
//             hover:bg-[#144170]/80 text-white duration-500
//             "
//           >
//             <button type="submit" className="uppercase">
//               Update Profile
//             </button>
//           </div>
//           <div
//           onClick={HandleRestForm}
//             className="px-12 py-2 bg-[#144170] w-fit font-bold  cursor-pointer
//             hover:bg-[#144170]/80 text-white active:scale-95 duration-300
//             "
//             >
//             <button type="reset" className="uppercase ">
//               Reset Form
//             </button>
//           </div>
//          </div>
//         </form>
//       </div>
//     </div>
//             </>
//   );
// }

// export default Setting


import React, { useState } from 'react';
import { IoSettingsOutline } from "react-icons/io5";
import { ProfileResetApi } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { toast, Toaster } from "react-hot-toast";

const Setting = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    gstNo: "",
    panNo: ""
  });

  const [errors, setErrors] = useState({
    gstNo: "",
    panNo: ""
  });

  const validateGST = (gstNo) => {
    const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
    return gstRegex.test(gstNo);
  };

  const validatePAN = (panNo) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    return panRegex.test(panNo);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    // Reset error when user changes input
    setErrors({
      ...errors,
      [e.target.id]: ""
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation checks for GST and PAN
    let gstValid = true;
    let panValid = true;

    if (formData.gstNo && !validateGST(formData.gstNo)) {
      gstValid = false;
      setErrors((prevErrors) => ({ ...prevErrors, gstNo: "Invalid GST Number" }));
    }

    if (formData.panNo && !validatePAN(formData.panNo)) {
      panValid = false;
      setErrors((prevErrors) => ({ ...prevErrors, panNo: "Invalid PAN Number" }));
    }

    // If any field is invalid, stop form submission
    if (!gstValid || !panValid) {
      return;
    }

    const hasValue = Object.values(formData).some(
      (field) => field !== "" && field !== null
    );

    if (!hasValue) {
      toast.error("Please fill at least one field to update the profile.");
      return;
    }

    try {
      const res = await dispatch(ProfileResetApi(formData));
      console.log(res);
      if (res.type === "userprofile/fulfilled") {
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Profile not Updated. Please try again.");
    }
  };

  // Handle form reset
  const HandleRestForm = () => {
    setFormData({
      name: "",
      email: "",
      mobile: "",
      gstNo: "",
      panNo: ""
    });
    setErrors({
      gstNo: "",
      panNo: ""
    });
  };

  return (
    <>
      <Toaster />
      <div className="border-2 w-full rounded-md mx-4 b-white">
        <div className="border-b-2 mx-2 p-4 text-3xl font-bold flex items-center gap-2">
          <div className="bg-[#144170] p-2 text-white rounded-full">
            <IoSettingsOutline />
          </div>
          <h1 className="uppercase">Profile Settings</h1>
        </div>
        {/* Fields */}
        <div className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-around items-center gap-12">
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-14 border-2 rounded-md outline-none px-2"
                  placeholder="Enter name"
                />
              </div>
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-14 border-2 rounded-md placeholder:px-2 outline-none px-2"
                  placeholder="Enter Email"
                />
              </div>
            </div>
            <div className="flex justify-around items-center gap-12">
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="mobile">Mobile Number:</label>
                <input
                  type="text"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="h-14 border-2 rounded-md outline-none px-2"
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="input-1 w-full flex-col flex">
                <label htmlFor="gstNo">GST NUMBER:</label>
                <input
                  type="text"
                  id="gstNo"
                  value={formData.gstNo}
                  onChange={handleChange}
                  className="h-14 border-2 rounded-md placeholder:px-2 outline-none px-2"
                  placeholder="Enter GST No (optional)"
                />
                {errors.gstNo && (
                  <p className="text-red-500 text-sm">{errors.gstNo}</p>
                )}
              </div>
            </div>
            <div className="input-1 w-full flex-col flex">
              <label htmlFor="panNo">PAN NO:</label>
              <input
                type="text"
                id="panNo"
                value={formData.panNo}
                onChange={handleChange}
                className="h-14 border-2 rounded-md placeholder:px-2 outline-none px-2"
                placeholder="Enter PAN NO (optional)"
              />
              {errors.panNo && (
                <p className="text-red-500 text-sm">{errors.panNo}</p>
              )}
            </div>
            <div className="flex gap-2">
                <button type="submit" className="uppercase px-12 py-2 bg-[#144170] w-fit font-bold cursor-pointer hover:bg-[#144170]/80 text-white duration-500">
                  Update Profile
                </button>
              <div
                onClick={HandleRestForm}
                className="px-12 py-2 bg-[#144170] w-fit font-bold cursor-pointer hover:bg-[#144170]/80 text-white active:scale-95 duration-300"
              >
                <button type="reset" className="uppercase">
                  Reset Form
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;

