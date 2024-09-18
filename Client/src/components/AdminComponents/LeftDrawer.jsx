// import React from 'react'
import Kfs_logo from "../../assets/logo.png";
import { linksAdmin } from '../../constant';
import {Link, useNavigate} from "react-router-dom"
import { FiLogOut } from "react-icons/fi";
import { useRef, useState } from "react";
import { BsChevronBarRight, BsChevronBarLeft } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { removeuser } from "../../features/authSlice";
import toast from "react-hot-toast";


const LeftDrawer = () => {
  const [expanded, setExpanded] = useState(true);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showWebsiteDropdown, setShowWebsiteDropdown] = useState(false);
  const [showBlogDropdown, setShowBlogDropdown] = useState(false);
  const [showCouponDropdown, setShowCouponDropdown] = useState(false);
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const navigate = useNavigate();

  const logoutHandler = ()=>{
    localStorage.removeItem('token');
    localStorage.removeItem("id")
    dispatch(removeuser());
    toast.success('Logged out successfully.');
    navigate('/');
  }

  return (
    <div className="h-screen flex flex-col justify-between overflow-y-scroll  ">
      <nav
        className={
          expanded
            ? "flex flex-col items-center justify-between  w-[15rem]"
            : "w-14 overflow-hidden"
        }
      >
        <div className="h-24 w-full flex items-center justify-around gap-2 py-2">
          <Link to="/" >
            <img
              src={Kfs_logo}
              alt=""
              className={`overflow-hidden transition-all ${
                expanded ? "w-28" : "w-0"
              }`}
            />
          </Link>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-2.5 mt-5 rounded-full bg-gray-100 hover:bg-gray-200"
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
                className="hover:bg-[#0A2440] hover:text-white duration-300 "
                key={item.id}
              >
                {user !== null &&
                  (user?.role === "Admin" ||
                    (user.role === "Employee" &&
                      user?.allowedRoutes?.includes(
                        item.label.toLowerCase()
                      ))) && (
                    <Link
                      to={item.route}
                      key={item.id}
                      className={
                        location.pathname === item.route
                          ? "flex p-4 items-center bg-[#0A2440] text-white"
                          : "flex p-4 items-center justify-between"
                      }
                    >
                      <div className="flex items-center gap-x-1">
                        <div>
                          <item.icon size={30} />
                        </div>
                        <li
                          onClick={() => {
                            if (item.label === "Products") {
                              setShowProductDropdown((prev) => !prev);
                            }
                            // else if(item.label === 'Website'){
                            //   setShowWebsiteDropdown(prev => !prev);
                            // }
                            else if (item.label === "Blogs") {
                              setShowBlogDropdown((prev) => !prev);
                            } else {
                              setShowCouponDropdown((prev) => !prev);
                            }
                          }}
                          className="p-2 uppercase"
                        >
                          {item.label}
                        </li>
                      </div>
                      {item.sublink && (
                        <div
                          onClick={() => {
                            if (item.label === "Products") {
                              setShowProductDropdown((prev) => !prev);
                            }
                            // else if(item.label === 'Website'){
                            //   setShowWebsiteDropdown(prev => !prev);
                            // }
                            else if (item.label === "Blogs") {
                              setShowBlogDropdown((prev) => !prev);
                            } else {
                              setShowCouponDropdown((prev) => !prev);
                            }
                          }}
                          className="hover:scale-105"
                        >
                          <IoIosArrowDropdown />
                        </div>
                      )}
                    </Link>
                  )}
              </div>

              {user !== null &&
                (user?.role === "Admin" ||
                  (user.role === "Employee" &&
                    user?.allowedRoutes?.includes(item.label.toLowerCase()))) &&
                ((item.label === "Products" && showProductDropdown) ||
                  (item.label === "Website" && showWebsiteDropdown) ||
                  (item.label === "Blogs" && showBlogDropdown) ||
                  (item.label === "Coupon" && showCouponDropdown)) && (
                  <ul className="flex-col items-center justify-start w-full">
                    {item.submenu && (
                      <ul className="flex-col items-center justify-start w-full">
                        {item.sublink.map((link) => (
                          <Link
                            key={link.id}
                            to={link.route}
                            className={
                              location.pathname === link.route
                                ? "flex items-center px-10 w-full justify-start bg-[#0A2440]/80 p-2 text-white"
                                : "flex items-center px-10 w-full justify-start hover:bg-[#0A2440]/80 p-2 hover:text-white"
                            }
                          >
                            {<item.icon size={20} />}
                            <li className="p-2 uppercase">{link.label}</li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </ul>
                )}
            </>
          ))}
        </ul>

      </nav>
      {user !== null && (
          <div className=" flex mt-12  w-full bg-[#0A2440] p-4 text-xl text-white items-center justify-center gap-2">
            <button className={expanded ? "uppercase":"hidden"} onClick={logoutHandler}>
              LogOut
            </button>
            <FiLogOut />
          </div>
        )}
    </div>
  );
}

export default LeftDrawer