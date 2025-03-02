import React from 'react'
import "./Loader.css"
const Loader = () => {
  return (
    <div className="flex-col gap-4  flex min-h-full items-center justify-center">
    <div
      className="w-10 h-10 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        className="w-12 h-12 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
      ></div>
    </div>
  </div>

  )
}

export default Loader
