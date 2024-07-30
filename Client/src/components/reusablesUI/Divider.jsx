import React from 'react'

const Divider = () => {
  return (
    <div className='px-4 flex items-center gap-1'>
      <div className="h-[1px] w-full bg-gray-500"></div>
      <span>or</span>
      <div className="h-[1px] w-full bg-gray-500"></div>
    </div>
  )
}

export default Divider
