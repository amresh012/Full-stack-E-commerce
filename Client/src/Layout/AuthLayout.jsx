import React from 'react'
import { Outlet } from 'react-router-dom'
import Navabr from "../components/Navbar/Navbar"
const AuthLayout = () => {
  return (
    <div>
        <Navabr/>
      <Outlet/>
    </div>
  )
}

export default AuthLayout
