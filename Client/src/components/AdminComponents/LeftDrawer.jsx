// import React from 'react'
import {Kfs_logo} from "../../assets/images"
import { linksAdmin } from '../../constant';
import {Link} from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { useRef, useState } from "react";
import { BsChevronBarRight, BsChevronBarLeft } from "react-icons/bs";


const LeftDrawer = () => {
  const [expanded, setExpanded] = useState(true)
  const submenuref = useRef(null)
  const handleClick = ()=>{
    submenuref.current.style.width=0
  }
  return (
    <>
      <nav
        className={
          expanded
            ? "flex flex-col items-center justify-between border-r-2 w-[20rem] h-[100vh]"
            : "w-14 overflow-hidden"
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
                className="hover:bg-[#0A2440] hover:text-white duration-300 text-xl"
                key={item.id}
                onClick={handleClick}
              >
                <Link
                  to={item.route}
                  key={item.id}
                  className={
                    location.pathname === item.route
                      ? "flex p-4 items-center bg-[#0A2440] text-white"
                      : "flex p-4 items-center"
                  }
                >
                  <div className="">{<item.icon size={30} />}</div>
                  <li className="p-2 uppercase">{item.label}</li>
                </Link>
              </div>
              <ul className="flex-col items-center justify-start w-full">
                {item.submenu &&
                  item.sublink.map((link) => (
                    <Link
                      key={link.id}
                      to={link.route}
                      ref={submenuref}
                      className={
                        location.pathname === link.route
                          ? "flex items-center px-12 w-full justify-start bg-[#0A2440]/80 p-2 text-white"
                          : "flex items-center px-12 w-full justify-start hover:bg-[#0A2440]/80 p-2 hover:text-white"
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
         <div
          className="flex bg-[#0A2440] p-4 w-full text-xl text-white items-center  justify-center gap-2"
          >
          <button className="uppercase">LogOut</button>
          <FiLogOut/>
         </div>
      </nav>
    </>
  );
}

export default LeftDrawer
