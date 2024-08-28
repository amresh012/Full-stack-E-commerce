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
        <div className="header h-12 bg-transparent pt-4 bg-blue-100"></div>
        <div className="h-[23rem] flex justify-around ">
          {/* section-1 */}
          <div className="w-[20rem]  h-full flex flex-col p-2  items-start justify-start ">
            <h1 className=" font-extrabold text-4xl w-full text-[#0a2440] mb-2">
              Fitness Equipment Built to Perfection
            </h1>
            <p className="capitalize font-lg font-light mb-6">
              Adding fuel to every fitness fanatics passion with the best
              equipment in India.
            </p>
            <Link to="/product" className="w-full">
              <div className="p-2 w-full text-center rounded-sm bg-[#0a2440] px-2 font-light shadow-md py-2 text-white text-xl">
                Shop
              </div>
            </Link>
          </div>
          {/* section-1 end */}
          <Divider orientation="vertical" variant="middle" flexItem />
          {/* section-2 */}
          <div className="w-[25rem]">
            <ul className="overflow-y-scroll max-h-[20rem] no-scrollbar">
              {links.map((item,ind) => (
                <div key={ind} className="p-2  duration-300 underline-offset-8 flex flex-col  gap-1">
                  {/* <GoDash className="text-indigo-500 font-bold" /> */}
                  <li onClick={() => window.location.replace(`/product-category${item.route}`)} className="">{item.name}</li>
                  {item.submenu &&
                    item.sublink.map((sublink, ind) => (
                      <ul
                        key={ind}
                        className=" flex flex-col gap-2 justify-start  font-medium hover:underline-none items-start"
                      >
                        <div onClick={() => window.location.replace("/product-category"+sublink.route)} className="flex">
                          <GoDash />
                          <li
                            className="hover:underline-none hover:font-bold hover:pl-2 duration-300"
                            key={sublink.key}
                          >
                            {sublink.label}
                          </li>
                        </div>
                      </ul>
                    ))}
                </div>
              ))}
            </ul>
          </div>
          {/* section-2 end */}

          <div className=" flex flex-col w-[35rem] pr-2  items-start gap-2 justify-start  ">
            <h1 className="">FEATURED</h1>
            <div className=" flex items-start h-full gap-2">
              <div className="flex flex-col gap-2 overflow-hidden">
                <img
                  src="https://kfsfitness.com/wp-content/uploads/2022/03/blog11.jpg"
                  alt=""
                  className="hover:scale-105 duration-300"
                />
                <span className="font-thin tracking-wider">
                  Competition Kit Bell
                </span>
              </div>
              <div className="flex flex-col gap-2 overflow-hidden ">
                <img
                  src="https://kfsfitness.com/wp-content/uploads/2022/03/blog15.jpg"
                  alt=""
                  className="hover:scale-105 duration-300"
                />
                <span className="font-thin tracking-widest">
                  {"'8'"}
                  {"'8'"} LIFTING PLATFORM
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Megamenu;
