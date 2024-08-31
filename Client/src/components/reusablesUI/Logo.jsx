import React from 'react'
import { Link } from 'react-router-dom';
import Img from "../../assets/logo.png";

const Logo = () => {
    let isLogo = true;

    return (
        <div className="logo-container z-50 lg:pb-2">
            {isLogo ? (
                <Link to="/">
                    <img src={Img} alt="logo" className="lg:h-12 h-8" />
                </Link>
            ) : (
                <Link to="/">
                    <p>Company Logo</p>
                </Link>
            )}
        </div>
    )
}

export default Logo
