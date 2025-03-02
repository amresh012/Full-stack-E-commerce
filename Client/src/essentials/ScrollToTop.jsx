import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardDoubleArrowUp } from "react-icons/md";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle the scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll effect
    });
  };

  // Show or hide the button depending on the scroll position
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-black/50 p-4 rounded-full text-white">
          <MdOutlineKeyboardDoubleArrowUp/>
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
