// import React from 'react'
import {Kfs_logo} from "../../assets/images"
import { linksAdmin } from '../../constant';
import {Link} from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { BsChevronBarRight, BsChevronBarLeft } from "react-icons/bs";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import {Kfs_logo2} from "../../assets/images"


const LeftDrawer = () => {
  const [expanded, setExpanded] = useState(true)
  const location = useLocation();
  const [isLoggedIn , setIsLoggedIn] = useState(true)
 

  return (
    <>
      <nav
        className={
          expanded
            ? "flex flex-col items-center justify-between border-r-2 h-full"
            : "w-0 overflow-hidden"
        }
      >
        <div className="h-24 w-full border-b-2 flex items-center justify-around">
          <img
            src={Kfs_logo}
            alt=""
            className={`overflow-hidden transition-all ${
              expanded ? "w-48" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2.5 mt-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            {expanded ? (
              <BsChevronBarRight size={20} />
            ) : (
              <BsChevronBarLeft size={20} />
            )}
          </button>
        </div>
        {/* navlinks */}

        <ul className="h-full w-full items-center justify-around">
          {linksAdmin.map((item) => (
            <>
              <div
                className="hover:bg-[#038CCC] hover:text-white duration-300 text-xl"
                key={item.id}
              >
                <Link
                  to={item.route}
                  key={item.id}
                  className={
                    location.pathname === item.route
                      ? "flex p-4 items-center bg-[#038CCC] text-white"
                      : "flex p-4 items-center"
                  }
                >
                  <div className="">{<item.icon size={30} />}</div>
                  <li className="p-2 uppercase">{item.label}</li>
                </Link>
              </div>
              <ul className="flex  flex-col items-center justify-start w-full">
                {item.submenu &&
                  item.sublink.map((link) => (
                    <Link
                      key={link.id}
                      to={link.route}
                      className={
                        location.pathname === link.route
                          ? "flex items-center px-12 w-full justify-start bg-[#038CCC]/80 p-2 text-white"
                          : "flex items-center px-12 w-full justify-start hover:bg-[#038CCC]/80 p-2 hover:text-white"
                      }
                    >
                      {<item.icon size={20} />}
                      <li className="p-2 uppercase">{link.label}</li>
                    </Link>
                  ))}
              </ul>
            </>
          ))}
        </ul>
        {
          isLoggedIn 
          ? 
          <div className="flex justify-around gap-2  mt-8  p-2  items-center w-full group relative">
           <div className="bg-fuchsia-300/20 rounded-xl border-2">
           <img src={Kfs_logo2} alt="" className="h-16 w-16   rounded-xl " />
           </div>
            <div className="">
              <p className="name font-bold text-xl">Admin Man</p>
              <p className="email font-light">Admin@admin.com</p>
            </div>
            <div className=" cursor-pointer">
              <PiDotsThreeVerticalBold size={25}/>
              <div className="dropdown absolute hidden w-44  p-2 -right-[59%] bg-white group-hover:flex flex-col items-center gap-2 bottom-4 rounded-md shadow-md">
                 <div className="flex items-center gap-2 hover:bg-gray-100 w-full p-2 rounded-md ">
                  <FiLogOut/>
                   <p className="uppercase">LogOut</p>
                 </div>
                 <div className="flex  items-center gap-2 hover:bg-gray-100 w-full p-2 rounded-md ">
                  <IoSettingsOutline/>
                   <p className="uppercase">Setting</p>
                 </div>
              </div>
            </div>
          </div> 
          : 
          <div className="flex flex-col mt-12 gap-4 w-full p-2 text-white  text-xl">
          <button className="bg-[#038CCC] hover:bg-[#038CCC]/80 p-2 rounded-md uppercase">Login</button>
          <button className="bg-[#038CCC] hover:bg-[#038CCC]/80 p-2 rounded-md uppercase">Register</button>
        </div>
        }
      </nav>
    </>
  );
}

export default LeftDrawer
