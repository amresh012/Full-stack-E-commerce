import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LeftDrawer from "../components/AdminComponents/LeftDrawer"
import toast from 'react-hot-toast';
import {base_url} from '../Utils/baseUrl';
import { adduser } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import MobileSideBar from '../components/AdminComponents/Mobilesidebar';

const AdminLayout = () => {
  const navigate = useNavigate
  const dispatch = useDispatch();

  const checkAccess = async (token)=>{
    try{
      const response = await fetch(base_url+'user/login-with-access-token', {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          token: token
        })
      });
      const data = await response.json();
      // console.log(data)
      if(!data.success){
        throw new Error(data.message);
      }
      dispatch(adduser({...data.user, token: data.token}));
      // console.log(data.user)
      if(data.user.role !== 'Admin' && data.user.role !== 'Employee'){
        toast.error('You are not authorized to access this route');
        navigate('/');
      }
      localStorage.setItem('token', data.token);
      toast.success(data.message);
    }
    catch(err){
      toast.error(err.message);
    }
  }

  useEffect(()=>{
    if(localStorage.getItem('token')){
      const token = localStorage.getItem('token');
      checkAccess(token);
    }
    else{
      navigate('/')
    }
  }, [])
  return (
    <div className="flex h-[100vh] overflow-hidden">
      <div className="">
        <div className="hidden lg:block">
          <LeftDrawer />
        </div>
        <div className="block lg:hidden">
          <MobileSideBar />
        </div>
      </div>
      <div className="w-full h-[100vh] overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout
