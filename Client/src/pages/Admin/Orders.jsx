import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { FaFunnelDollar } from 'react-icons/fa';
const Orders = () => {
  return (
    <div className='border-2 rounded-md shadow-md  h-auto flex flex-col items-start justify-around mx-12'>
      <div className="p-12 flex flex-col w-full gap-4 ">
        <h1 className='text-4xl font-bold'>Orders</h1>
        <div className=" flex gap-12 justify-around items-center w-full ">
            <div className="flex flex-col w-full ">
                <label htmlFor="" className='text-xl font-bold'>Starting Date</label>
                <input type="datetime-local" className='border-2 h-12 p-2 w-full' />
            </div>
            <div className="flex flex-col w-full">
                <label htmlFor="" className='text-xl font-bold'>Ending Date</label>
                <input type="datetime-local" className='border-2 h-12 p-2  w-full' />
            </div>
            <div className=" h-full w-fit gap-1 px-2 hover:bg-blue-500 hover:text-white duration-300  mt-5  border-blue-500 border-2 text-xl flex items-center justify-center">
                <button className='px-2 py-2'>Filter</button>
                <FaFunnelDollar/>
            </div>
        </div>
      </div>
      {/* section-2 */}
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
        <div className="bg-black">
            <input type="search" className='h-10 w-60  focus:shadow-md  outline-none px-2' />
            <button className="p-2 text-white">Search</button>
        </div>
      </div>
    </div>
  )
}

export default Orders
