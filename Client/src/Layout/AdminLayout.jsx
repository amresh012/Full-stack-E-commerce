import  { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import LeftDrawer from "../components/AdminComponents/LeftDrawer"
import toast from 'react-hot-toast';
import {base_url} from '../Utils/baseUrl';
import { adduser } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import AdminHeader from '../components/AdminComponents/AdminHeader';

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
      // toast.success(data.message);
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
    <div className="">
      <div className="fixed ">
          <LeftDrawer />
      </div>
      <div className="ml-[15rem]">
        <AdminHeader/>
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout
