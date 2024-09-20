import React from 'react'
import { IoLogoWhatsapp } from "react-icons/io5";
import { Link } from 'react-router-dom';

export const WhatsappSupport = () => {
     const phoneNumber = "919717780714"; // Replace with your phone number
     const message = "Hello, I'm interested in your products";

     const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
       message
     )}`;


    return (
      <div className="group" style={styles.scrollToTopBtn}>
        <Link to={whatsappUrl}>
          <button className="relative shadow-md shadow-[#2AB226]">
            <IoLogoWhatsapp size={40} />
          </button>
        </Link>
        <span className="hidden md:group-hover:block  capitalize  bg-[#2AB226] text-white p-2 absolute top-3  left-[5rem]  w-[30rem] rounded-md shadow-md">
          You are one Click away from getting professional Support.
        </span>
      </div>
    );
}


const styles = {
  scrollToTopBtn: {
    position: "fixed",
    bottom: "20px",
    left: "20px",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#2AB226",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    zIndex: 1000,
  },
};