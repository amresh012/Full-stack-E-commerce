import React from 'react'
import Divider from './Divider'
import {FcGoogle} from "react-icons/fc"
const SocialAuthUI = () => {
  return (
    <div className="social-SignIn flex flex-col gap-2 ">
          <Divider/>
         <div className="flex  justify-center items-center
          gap-2 text-base  w-full border-2 p-2 
          hover:shadow-md hover:bg-blue-500 hover:text-white rounded-md duration-300 cursor-pointer">
            <FcGoogle size={30}/>
            <p>SignUp With Google</p>
          </div>
        </div>
  )
}

export default SocialAuthUI
