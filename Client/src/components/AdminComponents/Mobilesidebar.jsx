import React, { useState } from "react";
import Kfs_logo from "../../assets/logo.png";
import { Button, Drawer, Radio, Space } from "antd";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { FiLogOut } from "react-icons/fi";
import { removeuser } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { linksAdmin } from "../../constant";
import { IoIosArrowDropdown } from "react-icons/io";
const MobileSideBar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("left");
   const [showProductDropdown, setShowProductDropdown] = useState(false);
   const [showWebsiteDropdown, setShowWebsiteDropdown] = useState(false);
   const [showBlogDropdown, setShowBlogDropdown] = useState(false);
   const [showCouponDropdown, setShowCouponDropdown] = useState(false);
 const dispatch = useDispatch();
 const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  
  // logout
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    dispatch(removeuser());
    toast.success("Logged out successfully.");
    navigate("/");
  };

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  return (
    <>
      <Space>
        <Radio.Group value={placement} onChange={onChange}>
          {" "}
        </Radio.Group>
        <Button
          className=" border-none text-white  p-4 mt-8 bg-[#0a2444]"
          onClick={showDrawer}
        >
          <HiMiniBars3BottomRight size={30} />
        </Button>
      </Space>
      <Drawer
        placement={placement}
        closable={false}
        onClose={onClose}
        open={open}
        key={placement}
      >
        <div className="h-screen">
          <nav className="flex flex-col items-center justify-between w-[20rem]">
            <div className="h-24 w-full border-b-2 flex items-center justify-center py-2">
              <Link to="/" onClick={logoutHandler}>
                <img
                  src={Kfs_logo}
                  alt=""
                  className={`overflow-hidden h-12 transition-all`}
                />
              </Link>
              {/* <button
                onClick={() => setExpanded((curr) => !curr)}
                className="p-2.5 mt-5 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                {expanded ? (
                  <BsChevronBarRight size={20} />
                ) : (
                  <BsChevronBarLeft size={20} />
                )}
              </button> */}
            </div>
            {/* navlinks */}

            <ul className="h-full w-full items-center justify-around">
              {linksAdmin.map((item) => (
                <>
                  <div
                    className="hover:bg-[#0A2440] hover:text-white duration-300 text-xl"
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
                          onClick={onClose}
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
                        user?.allowedRoutes?.includes(
                          item.label.toLowerCase()
                        ))) &&
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
                                <li className="p-2 uppercase" onClick={onClose}>{link.label}</li>
                              </Link>
                            ))}
                          </ul>
                        )}
                      </ul>
                    )}
                </>
              ))}
            </ul>

            {user !== null && (
              <div className=" flex mt-12  w-full bg-[#0A2440] p-4 text-xl text-white items-center justify-center gap-2">
                <button onClick={logoutHandler}>LogOut</button>
                <FiLogOut />
              </div>
            )}
          </nav>
        </div>
      </Drawer>
    </>
  );
};
export default MobileSideBar;
