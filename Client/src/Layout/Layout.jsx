import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer';
import { base_url } from '../Utils/baseUrl';
import { adduser } from '../features/authSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import ScrollToTop from "../essentials/ScrollToTop"
import { setCart } from '../features/cartSlice';
const Layout = () => {
    const dispatch = useDispatch();

    const checkAccess = async (token) => {
        try {
            const response = await fetch(base_url + 'user/login-with-access-token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: token
                })
            });
            const data = await response.json();
             console.log(data)
             console.log(data.user.cart)
            if (!data.success) {
                throw new Error(data.message);
            }
            dispatch(adduser({...data.user, token: data.token}));
            dispatch(setCart(data.user.cart))
            localStorage.setItem('token', data.token);
            // toast.success(data.message);
        }
        catch (err) {
            toast.error(err.message);
        }
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            const token = localStorage.getItem('token');
            checkAccess(token);
        }
    }, [])

    return (
        <div className='overflow-clip'>
            <Navbar />
            <Outlet />
            <ScrollToTop/>
            <Footer />
        </div>
    )
}

export default Layout
