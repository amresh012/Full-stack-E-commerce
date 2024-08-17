import { Link } from "react-router-dom";
import { BiSearch, BiShoppingBag, BiPlus } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import Megamenu from "../MegaMenu/Megamenu";
import {Badge } from "@mui/material";
import LeftDrawer from "../Drawers/LeftDrawer";
import MobileNav from "../MobileNav/MobileNav";
import {  useEffect, useRef, useState } from "react";
import "./Navbar.css"
import Logo from "../reusablesUI/Logo";
import AccountMenu from "../UserDashComp/AccountMenu";
import { useSelector } from "react-redux";

const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About Us",
    route: "/about",
  },
    {
      label: "Home Gym",
      route: "/",
    },
  {
    label: "Commercial Setup",
    route: "/commercial-gym",
  },
  {
    label: "Products",
  },
  {
    label: "Blog",
    route:"/blog"
  },
  {
    label: "Contact Us",
    route: "/contact",
  },
];

const Navbar = () => {
  const inputref = useRef(null)
  const {carts} = useSelector((state) => state.cart);
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setIsLoggedIn(true)
    }

  },[isLoggedIn])
  

  return (
    <nav className="flex justify-around items-center p-4 ">
      <div className="logo-container z-50 ">
       <Logo/>
      </div>
      {/*  */}
      <ul className="lg:flex items-center gap-8 hidden ">
        {links.map((item) => (
          <Link to={item.route} key={item.label} className="hover:border-b-2 hover:border-black uppercase font-semibold text-sm ">
            {item.label == "Products" ||  item.label=="Home Gym" ? (
              <Megamenu title={item.label} icon={<BiPlus size={12} />} />
            ) : (
              <li className="">{item.label}</li>
            )}
          </Link>
        ))}
      </ul>
      {/*  */}

      <div className="lg:flex items-center  justify-center gap-2  cursor-pointer z-50 hidden ">
        <div className="search-box flex border-2 rounded-full duration-500">
          <input ref={inputref} type="search" placeholder="Search" className=" rounded-l-full h-8 bg-slate-400/20 p-4 outline-none" />
          <div className=" top-2 rounded-r-full text-white bg-black p-2 right-3 active:scale-95">
            <BiSearch/>
          </div>
        </div>
       {
         isLoggedIn ?
         <AccountMenu/>
         :
          <Link to="/login">
         <div className=" text-2xl text-blue-500 font-bold  mt-1 ml-3">
           <RxAvatar/>
         </div>
         </Link>
        }
         <div className="">
         <Badge badgeContent= {carts.length || 0} color="secondary" aria-label="cart">
            <LeftDrawer icon={<BiShoppingBag size={25} className="" />} />
          </Badge>
         </div>
      </div>
      <MobileNav/>
    </nav>
  );
};

export default Navbar;



//  <div className="">
//           <Badge badgeContent= {carts.length || 0} color="secondary" aria-label="cart">
//             <LeftDrawer icon={<BiShoppingBag size={25} className="" />} />
//           </Badge>
//         </div>