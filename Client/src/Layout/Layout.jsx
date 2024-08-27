import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'

const Layout = () => {
    return (
        <div className='overflow-clip'>
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    )
}

export default Layout
