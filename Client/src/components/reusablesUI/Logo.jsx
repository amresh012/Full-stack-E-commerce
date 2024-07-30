import React from 'react'
import { Link } from 'react-router-dom';
import Img from "../../assets/Untitled-1.png";

const Logo = () => {
    let isLogo = true;

    return (
        <div className="logo-container z-50 pb-2">
            {isLogo ? (
                <Link to="/">
                    <img src={Img} alt="logo" className="h-12" />
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
