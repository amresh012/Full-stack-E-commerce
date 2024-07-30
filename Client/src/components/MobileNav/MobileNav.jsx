// import React from 'react'

const MobileNav = () => {

    const handleClick = () => {
        alert("clicked")
    }

  return (
      <div className="lg:hidden flex" onClick={handleClick}>
          <h1>Click Me</h1>
   </div>
  )
}

export default MobileNav