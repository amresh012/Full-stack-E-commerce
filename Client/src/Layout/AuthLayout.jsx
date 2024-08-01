import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from "../components/Footer"
import Navabr from "../components/Navbar/Navbar"
const AuthLayout = () => {
  return (
    <div>
        <Navabr/>
      <Outlet/>
      {/* <Footer/> */}
    </div>
  )
}

export default AuthLayout
