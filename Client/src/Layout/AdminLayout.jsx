import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftDrawer from "../components/AdminComponents/LeftDrawer"


const AdminLayout = () => {
  return (
    <>
    <LeftDrawer/>
    <Outlet/>
    </>
  )
}

export default AdminLayout
