import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftDrawer from "../components/AdminComponents/LeftDrawer"


const AdminLayout = () => {
  return (
    <div className='flex overflow-clip'>
   <div className="">
   <LeftDrawer/>
   </div>
    <div className="w-full">
      <Outlet/>
    </div>
    </div>
  )
}

export default AdminLayout
