import React, { useEffect, useState } from 'react'
import RefreshButton from '../reusablesUI/RefreshButton'
import AccountMenu from '../UserDashComp/AccountMenu'
import { CiBellOn, CiSearch } from 'react-icons/ci'
import { PiMoonLight } from 'react-icons/pi'
import { Badge } from '@mui/material'
import AOS from "aos";
import "aos/dist/aos.css";
const AdminHeader = () => {
  const [open, setOpen] = useState(false)
  const handletoggleNotification = () => {
    setOpen(!open)

  }
 useEffect(() => {
    AOS.init({
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
    AOS.refresh();
  }, []);

  return (
    <div className=" w-full p-2 flex justify-between items-center pl-10 bg-white border-b">
    <div className="border rounded-lg overflow-clip w-1/3 pr-2 flex items-center bg-white">
      <input
        type="search"
        name=""
        id=""
        className="outline-none w-full h-full p-2"
        placeholder="search for products, orders, customers"
      />
      <CiSearch size={20} />
    </div>
    <div className="grid cursor-pointer grid-cols-6 place-items-center">
      <span title='theme' className="p-2 bg-gray-100 rounded-full  font-bold">
        {" "}
        <PiMoonLight />
      </span>

        <Badge badgeContent={4} color="error">
      <span onClick={handletoggleNotification} title='notification' className="p-2 relative bg-gray-100 rounded-full group   font-bold">
        {" "}
        <CiBellOn />
       {open && <div data-aos="zoom-in" className="h-[20rem] shadow-md bg-white rounded-md border absolute min-w-[30rem] top-9 -left-[28rem]"></div>}
      </span>
        </Badge>

      <span  className="p-2 bg-gray-100 rounded-full  font-bold">
        <RefreshButton />
      </span>
      <AccountMenu />
    </div>
  </div>
  )
}

export default AdminHeader