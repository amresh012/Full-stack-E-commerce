import React from 'react'
import "./Loader.css"
const Loader = () => {
  return (
    <div class="flex-col gap-4 w-screen flex h-screen items-center justify-center">
    <div
      class="w-10 h-10 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
    >
      <div
        class="w-12 h-12 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
      ></div>
    </div>
  </div>

  )
}

export default Loader
