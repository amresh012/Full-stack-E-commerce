import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { base_url } from '../../Utils/baseUrl'
import {config} from "../../Utils/axiosConfig"
import Avatarupload from '../../components/UserDashComp/Avatarupload'
import { toast, Toaster } from 'react-hot-toast'
import { useSelector } from 'react-redux'
const Profile = () => {
  const User = useSelector((state) => state.auth.user)

  const location = useLocation(); 1
    const stat = location.state || {}



 const user = User?.user;
 const [data, setData] = useState({
   name: "" || stat?.name,
   email: "" || stat?.email,
   mobile: "" || stat?.mobile,
   Gst: "",
   Pan: "",
   address: [] || user?.address,
 });
  let id = localStorage.getItem("id") || user?._id

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(`${base_url}user/${id}`, {
        method: "GET",
        ...config,
      });
      const data = await response.json();
      if (!data.error) {
        setData({
          name: data?.name,
          email: data?.email,
          mobile: data?.mobile,
          Gst: data?.gstNo,
          Pan: data?.panNo,
          address: data?.address,
        });
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [User,id]);

  return (
    <>
      <div className="flex h-screen gap-6 p-2 flex-col w-full m-2 rounded-md items-center ">
        <div className="profileImage rounded-full">
          <Avatarupload />
        </div>
        <div className="rounded-md w-full">
          <div className="Profile-Header p-4 text-2xl uppercase font-bold">
            <h1>Profile</h1>
          </div>
          <div className="profileInfo flex flex-col gap-12">
            <div className="flex w-full items-center gap-2 justify-around ">
              <div className="w-full space-y-2  p-2">
                <span className="font-bold text-xl">NAME</span>
                <p className="border-b-2">{data?.name || "Loading..."}</p>
              </div>
              <div className="w-full  space-y-2 p-2">
                <span className="font-bold text-xl">PHONE NUMBER</span>
                <p className="border-b-2">{data?.mobile || "Loading..."}</p>
              </div>
            </div>
            {/*  */}
            <div className="flex w-full items-center gap-2 justify-around ">
              <div className="w-full space-y-2  p-2">
                <span className="font-bold text-xl">ADDRESS</span>
                {data?.address?.length <= 0 ? (
                  <p>Add Your Address</p>
                ) : (
                  data?.address?.map((adr, i) => (
                    <div className="" key={i}>
                      {adr.address}, {adr.city}, {adr?.zipcode}
                    </div>
                  ))
                )}
              </div>
              <div className="w-full  space-y-2 p-2">
                <span className="font-bold text-xl">EMAIL</span>
                <p className="border-b-2">{data?.email || "Loading..."}</p>
              </div>
            </div>
            {/*  */}
            <div className="flex w-full items-center gap-2 justify-around ">
              <div className="w-full space-y-2  p-2">
                <span className="font-bold text-xl">GST NUMBER</span>
                <p className="border-b-2">{data?.Gst || "N/A"}</p>
              </div>
              <div className="w-full  space-y-2 p-2">
                <span className="font-bold text-xl">PAN NUMBER</span>
                <p className="border-b-2">{data?.Pan || "N/A"}</p>
              </div>
            </div>
          </div>
          <div className="update profile  p-2">
            <div className="flex gap-12 p-2">
              <Link to="/profile/setting">
                <button className="bg-[#0a2444] p-2 text-white px-12">
                  Edit Profile{" "}
                </button>
              </Link>
              <Link to="/profile/shipping-add">
                <button className="bg-[#0a2444] p-2 text-white px-12">
                  Edit Address
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile
