import React from 'react'
import {Link} from  "react-router-dom"
import { IoIosLogOut } from "react-icons/io";
import { useDispatch} from "react-redux";
import { removeuser } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const links = [
    {
        id:1,
        header:"Orders",
        submenu:true,
        sublink:
        [
            // {
            //     id:0,
            //     label:"Report",
            //     icons:"",
            //     route:"/profile/report"
            // },
            {
                id:1,
                label:"My Orders",
                icons:"",
                route:"/profile/my-orders"
            },
            {
                id:2,
                label:"My Invoices",
                icons:"",
                route:"/profile/my-invoice"
            },
            
        ]
    },
    {
        id:2,
        header:"Profile",
        submenu : true,
        sublink:[
            {
                id:0,
                label:"Profile",
                icons:"",
                route:"/profile"
            },
            {
                id:1,
                label:"Profile Setting",
                icons:"",
                route:"/profile/setting"
            },
            {
                id:2,
                label:"Shipping Address",
                icons:"",
                route:"/profile/shipping-add"
            },
        ]
    },
]

const Sidebar = () => {
     const navigate = useNavigate();
     const dispatch = useDispatch();
   
     const handleLogOut = () => {
       if (localStorage.getItem("token")) {
         localStorage.removeItem("token");
         dispatch(removeuser());
         toast.success("logged Out Successfully");
         navigate("/login");
       }
     };


    return (
      <>
        <Toaster />
        <div className=" h-screen lg:w-[20rem] border-r-2 p-2 shadow-md ">
          <div className="h-24 flex items-center justify-center font-bold text-2xl border-b-2">
            <h1>My Account</h1>
          </div>
          <ul className="">
            {links.map((item) => (
              <div className=" h-full border-b-2 " key={item.id}>
                <li className="font-bold text-2xl bg-[#0a2444] text-white p-2 uppercase">
                  {item.header}
                </li>
                {item.submenu &&
                  item.sublink?.map((link) => (
                    <ul
                      key={link.label}
                      className="flex  gap-2 m-2 justify-start hover:bg-[#144170] rounded-md cursor-pointer hover:text-white font-medium items-start "
                    >
                      <Link
                        to={link.route}
                        key={link.label}
                        className="flex items-center gap-2 p-2"
                      >
                        {/* <div className="bg-zinc-200 p-2 rounded-full">
                           <img src={item.icon} alt={item.label} className='h-6' />
                           </div> */}
                        <li className="list-none text-base uppercase ">
                          {link.label}
                        </li>
                      </Link>
                    </ul>
                  ))}
              </div>
            ))}
          </ul>
          <div
            className=" gap-2 bg-red-500 text-white mt-12 w-full h-12 flex items-center justify-center active:scale-95 cursor-pointer"
            onClick={handleLogOut}
          >
            <button>LOGOUT</button>
            <IoIosLogOut size={20} />
          </div>
        </div>
      </>
    );
}

export default Sidebar
