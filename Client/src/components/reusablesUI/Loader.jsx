import React from 'react'
const Loader = () => {
  return (
  <>
   <div className="h-[50vh] w-[100vw] overflow-clip flex flex-col  items-center justify-center">
    <div className="w-12 h-12 rounded-full border-blue-500 border-dashed border-8 p-2 animate-spin duration-500"></div>
    <span>Loading...</span>
   </div>
  </>

  )
}

export default Loader
