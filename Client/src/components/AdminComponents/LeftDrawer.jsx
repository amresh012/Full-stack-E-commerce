import React from 'react'
import {Kfs_logo} from "../../assets/images"
import { linksAdmin } from '../../constant';
import {Link} from "react-router-dom"
import { RiMenu5Line } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";


const LeftDrawer = () => {
  return (
    <>
    <nav className=' flex flex-col items-center justify-between border-r-2 h-full'>
      <div className="h-24 w-full border-b-2 flex items-center justify-around">
       <img src={Kfs_logo} alt="" className='h-12' />
      <div className=" shadow-sm bg-zinc-100 mt-3 rounded-full p-2">
      <RiMenu5Line size={25} className=''/>
      </div>
      </div>
        {/* navlinks */}
         
         <ul className="h-full w-full items-center justify-around">
          {
            linksAdmin.map((item)=>(
             <div className="hover:bg-[#038CCC] hover:text-white duration-300 text-xl">
              <Link to={item.route} key={item.id} className='flex p-4 items-center  '>
               <div className="">
                {<item.icon size={30}/>}
               </div>
              <li className="p-2 uppercase">{item.label}</li>
             </Link>
             </div>
            ))
          }
         </ul>
        <div className="text-center flex items-center justify-center gap-2 w-full rounded-md logOut bg-[#038CCC] text-xl p-2 text-white">
          <button className='uppercase'>LogOut</button>
          <FiLogOut/>
        </div>
    </nav>
    </>
  )
}

export default LeftDrawer
