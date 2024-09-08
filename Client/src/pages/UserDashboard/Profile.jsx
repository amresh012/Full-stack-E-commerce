import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { base_url } from '../../Utils/baseUrl'
import {config} from "../../Utils/axiosConfig"
import {useSelector} from "react-redux"
import Avatarupload from '../../components/UserDashComp/Avatarupload';
import {toast} from 'react-hot-toast';
const Profile = () => {
 const [data , setData] = useState(
  {
    name:"",
    email:"",
    phone:"",
    address:"",
    gst:"",
    pan:"",

  }
)
 const auth = useSelector((state)=>state.auth)
 
  const fetchUserDetails = async (id) => {
    try {
      const response = await fetch(`${base_url}user/${id}`, {
        method: "GET",
        ...config,
      });
      const data = await response.json();
      
      setData({
        name: data?.getaUser?.name,
        email: data?.getaUser?.email,
        mobile: data?.getaUser?.mobile,
      });
      setOpen(true);
      // setFetchingUser(false);
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(()=>{
    fetchUserDetails()
  },[])


  return (
    <div className='flex h-screen gap-6 p-2 flex-col m-2 rounded-md items-center '>
      <div className="profileImage rounded-full">
       <Avatarupload/>
      </div>
     <div className="rounded-md w-full">
        <div className="Profile-Header p-4 text-2xl uppercase font-bold">
          <h1>Profile</h1>
        </div>
      <div className="profileInfo flex flex-col gap-12">
        <div className="flex w-full items-center gap-2 justify-around ">
        <div className="w-full space-y-2  p-2">
         <span className='font-bold text-xl'>NAME</span>
         <p className="border-b-2">Lina Keteyy</p>
         </div>
         <div className="w-full  space-y-2 p-2">
         <span className='font-bold text-xl'>PHONE NUMBER</span>
         <p className="border-b-2">Lina Keteyy</p>
         </div>
        </div>
        {/*  */}
        <div className="flex w-full items-center gap-2 justify-around ">
        <div className="w-full space-y-2  p-2">
         <span className='font-bold text-xl'>ADDRESS</span>
         <p className="border-b-2">Lina Keteyy</p>
         </div>
         <div className="w-full  space-y-2 p-2">
         <span className='font-bold text-xl'>EMAIL</span>
         <p className="border-b-2">Lina Keteyy</p>
         </div>
        </div>
        {/*  */}
        <div className="flex w-full items-center gap-2 justify-around ">
        <div className="w-full space-y-2  p-2">
         <span className='font-bold text-xl'>GST NUMBER</span>
         <p className="border-b-2">Lina Keteyy</p>
         </div>
         <div className="w-full  space-y-2 p-2">
         <span className='font-bold text-xl'>PAN NUMBER</span>
         <p className="border-b-2">Lina Keteyy</p>
         </div>
        </div>
      </div>
      <div className="update profile  p-2">
        <div className="flex gap-12 p-2">
          <Link to="/profile/setting">
          <button className="bg-[#0a2444] p-2 text-white px-12">Edit Profile </button>
          </Link>
          <Link to="/profile/shipping-add">
          <button className="bg-[#0a2444] p-2 text-white px-12">Edit Address</button>
          </Link>
        </div>
      </div>
     </div>
     </div>
  )
}

export default Profile
