import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/UserDashComp/Sidebar'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'

const UserProfile = () => {
  return (
    <>
    <Navbar/>
     <div className="flex w-full items-start justify-between">
        <div className="sidebar">
        <Sidebar/>
        </div>
        <div className="outlet mb-12  mr-20">
        <Outlet/>
        </div>
     </div>
     <Footer/>
    </>
  )
}

export default UserProfile
