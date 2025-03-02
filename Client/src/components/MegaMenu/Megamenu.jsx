/* eslint-disable react/prop-types */
import { Divider } from "@mui/material";
import "./Megamenu.css";
import { GoDash } from "react-icons/go";
import { links } from "../../constant";
import { Link, useNavigate } from "react-router-dom";

const Megamenu = ({ title, icon }) => {
  const navigate = useNavigate();
  
  return (
    <div className="dropdown ">
      <button className="dropbtn">
        <p className="uppercase font-light text-base">{title}</p>
        <span className="icon-1">{icon}</span>
        <span className="hidden icon-2 text-[#ff4700]">
          <GoDash size={20} />
        </span>
      </button>
      <div className="dropdown-content">
        <div className="header h-5 "></div>
        <div className=" flex justify-around ">
          {/* section-2 */}
          <div className="relative">
            <ul className=" overflow-y-scroll  max-h-[20rem] no-scrollbar">
              {links.map((item,ind) => (
                <div key={ind} className="p-2  group duration-300 underline-offset-8 flex flex-col  gap-1">
                  {/* <GoDash className="text-indigo-500 font-bold" /> */}
                  <li onClick={() => window.location.replace(`/product-category${item.route}`)} className="">{item.name}</li>
                { item.submenu &&
                <div className="hidden group-hover:block absolute top-0 bg-white space-y-2 border-l  -right-[14rem] min-w-[14rem] min-h-full">
                 {
                    item.sublink.map((sublink, ind) => (
                        <div key={ind} onClick={() => window.location.replace("/product-category"+sublink.route)} className="space-y-4 p-3 hover:bg-gray-200 h-full">
                          <li
                            className=""
                            key={sublink.key}
                          >
                            {sublink.label}
                          </li>
                        </div>
                    ))}
                 </div>}
                </div>
              ))}
            </ul>
          </div>
          {/* section-2 end */}
        </div>
      </div>
    </div>
  );
};

export default Megamenu;
