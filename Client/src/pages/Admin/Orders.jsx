import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable';
import Ordata from "../../MOCK_DATA (4).json"


// "id":8,"Invoice":542458,"orderd_by":"Jatri","Amount":7942,"mobile":7756482517,"sataus":"return Successfully"
const columns = [
  {
      header:"Sr.No.",
      accessorKey:"id"
  },
  {
      header:"Invoice No.",
      accessorKey:"Invoice"
  },
  {
      header:"OrderdBy",
      accessorKey:"orderd_by"
  },
  {
      header:"Contact Details",
      accessorKey:"mobile"
  },
  {
      header:"Amount in Rs",
      accessorKey:"Amount"
  },
  {
      header:"Status",
      accessorKey:"sataus"
  },
  {
    header:"Action",
  }
]

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
        <div className="flex rounded-md overflow-clip">
            <input type="search" className='h-10 w-60    outline-none px-2 border-2' />
            <button className="bg-gray-200 font-bold p-2 active:scale-95">Search</button>
        </div>
      </div>
     <div className="w-full p-4">
     <BasicTable columns={columns} data={Ordata} /> 
     </div>
    </div>
  )
}

export default Orders
