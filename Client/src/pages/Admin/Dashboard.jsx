import React, { useState } from 'react'
import { Button } from '@mui/material'
import Logo from '../../components/reusablesUI/Logo'
import GraphVisual from '../../components/AdminComponents/GraphVisual'
import LeftDrawer from "../../components/AdminComponents/LeftDrawer"
import { FaBars } from 'react-icons/fa6'
import {base_url} from "../../Utils/baseUrl"
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [VisibleDrawr , setVisibleDrawer] = useState(false)
  const navigate = useNavigate();

  const handleOpen=()=>{
    setVisibleDrawer(!VisibleDrawr)
    console.log(VisibleDrawr?"opend":"closed")
  }

  const handleLogout =async () => {
    // localStorage.removeItem('authToken');

    // localStorage.removeItem('userData');

    // document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // // Optionally, you could call an API endpoint to invalidate the token on the server
    await axios.post(`${base_url}api/user/logout`, );

    // // Redirect to login or home page
    alert("logged out successfully")
    navigate('/auth/login');

  };

 
  return (
    <>
    <LeftDrawer/>
    {/* <h1>AdminHome Page</h1>
     <div className="header flex justify-between items-center px-12 shadow-md h-[5rem]">
      <div className=" text-3xl flex items-center gap-4 z-50">
        <div className="cursor-pointer text-blue-500" onClick={handleOpen} >
          <FaBars/>
          <LeftDrawer icon={<FaBars size={30}/>}/>
        </div>
        <Logo/>
      </div>
      <Button variant="outlined" onClick={handleLogout}>LOGOUT</Button>
     </div> */}
     {/* <div className="flex">
      <GraphVisual/>
     </div> */}
    </>
  )
}

export default Dashboard
