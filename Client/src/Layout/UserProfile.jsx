import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/UserDashComp/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'

const UserProfile = () => {
  return (
    <>
    <Navbar/>
     <div className="flex w-full items-start justify-start mt-4">
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
