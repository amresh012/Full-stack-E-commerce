// import React from 'react'
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
const MobileNav = () => {

    const handleClick = () => {
        alert("clicked")
    }

  return (
      <div className="lg:hidden flex text-[2rem]" onClick={handleClick}>
          <HiOutlineBars3BottomRight/>
   </div>
  )
}

export default MobileNav