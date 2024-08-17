import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftDrawer from "../components/AdminComponents/LeftDrawer"


const AdminLayout = () => {
  return (
    <div className='flex w-full'>
   <div className="w-1/4">
   <LeftDrawer/>
   </div>
    <div className="w-full">
      <Outlet/>
    </div>
    </div>
  )
}

export default AdminLayout
