import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'

const Users = () => {
  return (
    <div className=' border-2 rounded-md shadow-md gap-4 h-auto flex flex-col items-center justify-around lg:mx-24 p-6'>
      <div className="w-full">
        <h1 className='text-3xl font-bold'>List Of Registerd Users on KFS</h1>
        <div className="flex items-center justify-between px-24 w-full">
        <div className="entries flex gap-2">
           <label htmlFor="">Entries:</label>
           <select name="" className='w-24'>
            <option value="">05</option>
            <option value="">10</option>
            <option value="">15</option>
            <option value="">20</option>
            <option value="">50</option>
            <option value="">100</option>
           </select>
        </div>
        <div className="flex rounded-md overflow-clip">
            <input type="search" className='h-10 w-60    outline-none px-2 border-2' />
            <button className="bg-gray-200 font-bold p-2 active:scale-95">Search</button>
        </div>
      </div>
      </div>
      <div className="w-full">
      <BasicTable/>
      </div>
    </div>
  )
}

export default Users
