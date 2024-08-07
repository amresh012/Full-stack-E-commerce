import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'

const ListProduct = () => {
  return (
    <div className=' rounded-md shadow-md gap-12 h-auto flex flex-col items-center justify-around lg:mx-24 p-6'>
       <div className="flex justify-between px-12 items-center w-full p-12">
        <h1 className='text-3xl'>List Of Contacts from website</h1>
        <div className="bg-black">
            <input type="search" className='h-10 w-60  focus:shadow-md  outline-none px-2' />
            <button className="p-2 text-white">Search</button>
        </div>
       </div>
      <div className="w-full">
      <BasicTable/>
      </div>
    </div>
  )
}

export default ListProduct
