import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/UserDashComp/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'

const UserProfile = () => {  
  return (
    <>
    <Navbar/>
     <div className="flex w-full items-start h-auto justify-start mt-4">
        <div className="sidebar ">
        <Sidebar/>
        </div>
        <Outlet/>
     </div>
     <Footer/>
    </>
  )
}

export default UserProfile
