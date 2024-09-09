import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../components/UserDashComp/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'

const UserProfile = () => {

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);
  
  return (
    <>
    <Navbar/>
     <div className="flex w-full items-start h-auto justify-start mt-4">
        <div className="sidebar ">
        <Sidebar/>
        </div>
        <div className="outlet w-full">
        <Outlet/>
        </div>
     </div>
     <Footer/>
    </>
  )
}

export default UserProfile
