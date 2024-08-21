import React from 'react'
import {Link} from  "react-router-dom"
import {useLocation} from "react-router-dom"
const links = [
    {
        id:1,
        header:"Orders",
        submenu:true,
        sublink:
        [
            {
                id:0,
                label:"Report",
                icons:"",
                link:"/report"
            },
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
                label:"Profile Setting",
                icons:"",
                route:"/profile"
            },
            {
                id:1,
                label:"Shipping Address",
                icons:"",
                route:"/profile/shipping-add"
            },
        ]
    },
]

const Sidebar = () => {
    // location = useLocation()
    // console.log(location)
  return (
    <div className=' h-screen lg:w-[15rem] border-2 shadow-md'>
      <div className="h-24 flex items-center justify-center font-bold text-2xl border-b-2">
        <h1>My Account</h1>
      </div>
       <ul className="">
        {
            links.map((item)=>(
                <div className=" h-full px-4 py-12 border-b-2 m-2">
                    <li className="font-bold text-xl uppercase">{item.header}</li>
                    {
                      item.submenu && item.sublink?.map((link)=>(
                        <ul  key={link.label} className="flex  gap-2 justify-start hover:bg-gray-200 cursor-pointer hover:text-white font-medium items-start ">
                           <Link  to={link.route} key={link.label} className='flex items-center gap-2 p-2'>
                           {/* <div className="bg-zinc-200 p-2 rounded-full">
                           <img src={item.icon} alt={item.label} className='h-6' />
                           </div> */}
                          <li className="list-none text-base uppercase">{link.label}</li>
                         </Link>
                        </ul>
                       ))
                    }
                </div>
            ))
        }
       </ul>
    </div>
  )
}

export default Sidebar
