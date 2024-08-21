import React from 'react'
import {useSelector} from "react-redux"
const Profile = () => {
    const signupdata = useSelector((state) => state.auth);
    console.log(signupdata)
  return (
   <>
   </>
  )
}

export default Profile
