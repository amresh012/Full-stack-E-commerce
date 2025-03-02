import { Link } from "react-router-dom";
import {  BiShoppingBag, BiPlus } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";
import Megamenu from "../MegaMenu/Megamenu";
import {Badge } from "@mui/material";
import LeftDrawer from "../Drawers/LeftDrawer";
import MobileNav from "../MobileNav/MobileNav";
import "./Navbar.css"
import AccountMenu from "../UserDashComp/AccountMenu";
import { useSelector } from "react-redux";
import { useCartHooks} from '../../hooks/cartHooks';
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";
import { useState } from "react";
import { FaBell } from "react-icons/fa";

const links = [
  {
    label: "Home",
    route: "/",
  },
  {
    label: "About Us",
    route: "/about",
  },
    // {
    //   label: "Home Gym",
    //   route: "/",
    // },
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
  const [footer, setFooter] = useState("")
  const Configuration = async () => {
    try {
      const re = await axios.get(`${base_url}config`);
      console.log(re);
      setFooter(re.data.name);
    } catch (e) {
      console.log(e);
    }
  };
  Configuration();








  const token = localStorage.getItem("token")  
  const {user} = useSelector(state => state.auth);
  const config = useSelector((state) => state.site);
  console.log(config)
  const { data } = useCartHooks();
  return (
    <nav className="flex justify-between items-center p-4 bg-black">
      <div className="logo-container z-50 ">
        {/* <Logo /> */}
        <h1  className="text-3xl font-bold text-white">VigorEdge</h1>
      </div>
      {/*  */}
      <ul className="lg:flex items-center gap-8 hidden pt-[9px]">
        {links.map((item) => (
          <Link
            to={item.route}
            key={item.label}
            className="text-white hover:border-b-2 hover:border-[#ff4700] uppercase font-light text-base"
          >
            {item.label == "Products" || item.label == "Home Gym" ? (
              <Megamenu
                title={item.label}
                icon={<BiPlus size={20} color={"#ff4700"} />}
              />
            ) : (
              <li className="">{item.label}</li>
            )}
          </Link>
        ))}
      </ul>
      {/*  */}

      <div className="flex items-center  justify-center  cursor-pointer z-50  ">
        <div className="">
          <Badge
           badgeContent={data?.products?.length || 0}
           color="primary"
           aria-label="nofification" 
          >
           <LeftDrawer icon={<FaBell/>}/>
          </Badge>
          <Badge
            badgeContent={data?.products?.length || 0}
            color="secondary"
            aria-label="cart"
          >
            <LeftDrawer
              icon={<BiShoppingBag color="white" size={25} className="" />}
            />
          </Badge>
        </div>
        <div className="">
        {user !== null || token ? (
          <AccountMenu />
        ) : (
          <Link to="/login">
            <div className=" text-2xl text-white font-bold  mt-1 ">
              <RxAvatar />
            </div>
          </Link>
        )}
        </div>
        <div className="lg:hidden block">
          <MobileNav navlinks={links} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

