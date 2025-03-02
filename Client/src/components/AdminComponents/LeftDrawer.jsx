// import React from 'react'
import Kfs_logo from "../../assets/logo.png";
import { linksAdmin } from '../../constant';
import {Link, useNavigate} from "react-router-dom"
import { FiLogOut, FiSidebar } from "react-icons/fi";
import { useRef, useState } from "react";
import { BsChevronBarRight, BsChevronBarLeft } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { removeuser } from "../../features/authSlice";
import toast from "react-hot-toast";


const LeftDrawer = () => {
  const [expanded, setExpanded] = useState(true);
  const [isOpen, setIsOpen] = useState(true);

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
    navigate("/admin/admin-login");
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="h-screen flex flex-col justify-between  ">
      <nav
        className={`flex flex-col relative  justify-between  h-full  ${
          isOpen ? "w-[15rem]" : "w-20"
        } h-screen  py-4  transition-width duration-300 border-r`}
      >
        <div className="h-24 w-full flex items-center justify-around gap-2 py-2 overflow-clip">
         {
          isOpen? <Link to="/" >
          {/* <img
            src={Kfs_logo}
            alt=""
            className={`overflow-hidden transition-all ${
              expanded ? "w-28" : "w-0"
            }`}
          /> */}
          <h1 className="text-2xl font-bold">Your Logo Here</h1>
        </Link> : <Link to="/" >
        <h1>YL</h1>
        </Link>
         }
          <button
            onClick={toggleSidebar}
            className=" -right-8 transition-colors duration-300 absolute top-5 z-50  rounded-full "
          >
            <FiSidebar size={20} />
          </button>
        </div>
        {/* navlinks */}

       {isOpen? <ul className="h-full w-full items-center justify-around p-3">
          {linksAdmin.map((item) => (
            <>
              <div
                className="hover:bg-[#0A2440] hover:text-white duration-300 space-y-4 "
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
                          ? "flex p-2 items-center bg-[#0A2440] text-white"
                          : "flex p-2 items-center justify-between"
                      }
                    >
                      <div className="flex items-center gap-x-1">
                        <div>
                          <item.icon size={20} />
                        </div>
                        <li
                          onClick={() => {
                            if (item.label === "Products") {
                              setShowProductDropdown((prev) => !prev);
                            }
                            else if(item.label === 'Website'){
                              setShowWebsiteDropdown(prev => !prev);
                            }
                            else if (item.label === "Blogs") {
                              setShowBlogDropdown((prev) => !prev);
                            } else {
                              setShowCouponDropdown((prev) => !prev);
                            }
                          }}
                          className="p-2 text-[13px] uppercase"
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
                            else if(item.label === 'Website'){
                              setShowWebsiteDropdown(prev => !prev);
                            }
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
                            <li className="p-2 uppercase text-[13px]">{link.label}</li>
                          </Link>
                        ))}
                      </ul>
                    )}
                  </ul>
                )}
            </>
          ))}
        </ul>:<ul className="h-full w-full items-center justify-around">
          {linksAdmin.map((item) => (
            <>
              <div
                className="hover:bg-[#0A2440] hover:text-white space-y-4 duration-300 "
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
                          ? "flex p-2 items-center  bg-[#0A2440] text-white"
                          : "flex p-2 items-center justify-between"
                      }
                    >
                      <div className="flex   gap-14">
                        <div className="flex gap-14 ">
                          <item.icon size={20} />
                        </div>
                      </div>
                      {/* {item.sublink && (
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
                      )} */}
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
        </ul>}

      </nav>
      {user !== null && (
          <div className=" flex  w-full bg-[#0A2440] p-4 text-xl text-white gap-2">
           {isOpen? <button className={expanded ? "uppercase flex items-center gap-3 text-[13px]":"hidden"} onClick={logoutHandler}>
           <FiLogOut />
              LogOut
            </button>:
            <FiLogOut />}
          </div>
        )}
    </div>
  );
}

export default LeftDrawer