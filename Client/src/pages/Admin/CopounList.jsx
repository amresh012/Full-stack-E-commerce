// import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import Cdata  from "../../MOCK_DATA (5).json"
import { List } from '@mui/material';
import BasicModal from '../../components/Models/Model';
import { FaEye, FaPen, FaPenAlt, FaTrash } from 'react-icons/fa';

const CopounList = () => {
  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "id",
    },
    {
      header: "Copoun Code",
      accessorKey: "copoun_code",
    },
    {
      header: "Copoun Type",
      accessorKey: "Copoun_type",
    },
    {
      header: "Discount in %",
      accessorKey: "discount_value",
    },
    {
      header: "Action",
      cell:()=>
      <List className='flex items-center justify-center text-xl'>
        <BasicModal className="text-red-500" icon={<FaTrash/>}/>
        <BasicModal icon={<FaEye/>}/>
         <BasicModal icon={<FaPenAlt/>}/>
      </List>
    },
  ];
  return (
    <div className='flex flex-col justify-around gap-12 items-center border-2 shadow-md h-auto mx-24 mt-4'>
    <div className="flex justify-between px-12 items-center w-full p-12">
     <h1 className='text-3xl'>Previously Added Copouns</h1>
     <div className="flex items-center bg-blue-500">
         <input type="search" className='h-10 w-60  focus:shadow-md border-2  outline-none px-2' />
         <button className="p-2 text-white">Search</button>
     </div>
    </div>
    <div className="w-full">
    <BasicTable columns={columns} data={Cdata}/>
    </div>
 </div>
  )
}



export default CopounList
