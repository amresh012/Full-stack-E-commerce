import React from 'react'

const ListProduct = () => {
  return (
    <div className='flex flex-col justify-around gap-12 items-center border-2 shadow-md h-auto'>
       <div className="flex justify-between px-12 items-center w-full p-12">
        <h1 className='text-3xl'>Products List</h1>
        <div className="bg-black">
            <input type="search" className='h-10 w-60  focus:shadow-md  outline-none px-2' />
            <button className="p-2 text-white">Search</button>
        </div>
       </div>
    </div>
  )
}

export default ListProduct
