import { Link } from "react-router-dom";
import { BiSearch, BiShoppingBag, BiPlus } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import Megamenu from "../MegaMenu/Megamenu";
import {Badge } from "@mui/material";
import LeftDrawer from "../Drawers/LeftDrawer";
import MobileNav from "../MobileNav/MobileNav";
import {  useEffect, useState } from "react";
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
  const {carts} = useSelector((state) => state.cart);
  console.log(carts)
  const [visible , setVisible] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const handleSearch=()=>{
    setVisible(true)
  }
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setIsLoggedIn(true)
    }

  },[isLoggedIn])
  

  return (
    <nav className="flex justify-around items-center py-12  h-20 ">
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
      <div className=" text-blue-600 text-2xl" onClick={handleSearch}>
            <BiSearch className='hover:scale-105 duration-150 cursor-pointer mt-2 ' />
            {
              visible && <div className=" searchbar absolute bg-transparent rounded-md overflow-hidden border-black border w-1/2 focus:outline-sky-500  right-2 top-20 flex">
              <input type="text"
               placeholder="Search for gym equipment..."
               onFocus={()=>setVisible(true)}
               onBlur={()=>setVisible(false)}
               className="w-full h-12  text-base px-2 placeholder:px-2 outline-none"/>
              <button className="p-2 bg-black text-white"><BiSearch/></button>
            </div>
            }
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
