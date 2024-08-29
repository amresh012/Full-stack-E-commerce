import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftDrawer from "../components/AdminComponents/LeftDrawer"


const AdminLayout = () => {
  return (
    <div className='flex h-[100vh] overflow-hidden'>
   <div className="">
   <LeftDrawer/>
   </div>
    <div className="w-full h-[100vh] overflow-auto">
      <Outlet/>
    </div>
    </div>
  )
}

export default AdminLayout
