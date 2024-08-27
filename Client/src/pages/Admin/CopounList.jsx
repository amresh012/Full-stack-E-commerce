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
      header: "Discount",
      accessorKey: "discount_value",
    },
    {
      header: "Action",
      cell:()=>
      <List className='flex items-center gap-2 justify-center cursor-pointer'>
       <div className="bg-red-200 p-2 rounded-md hover:shadow-md">
        <FaTrash className='text-red-500'/>
       </div>
       <div className="bg-blue-200 p-2 rounded-md hover:shadow-md">
        <FaEye className='text-blue-500'/>
       </div>
         <div className="bg-black/20 p-2 rounded-md hover:shadow-md">
          <FaPen className='text-black'/>
         </div>
      </List>
    },
  ];
  return (
    <>
    <div className='flex flex-col justify-around gap-12 items-center border-2 shadow-md h-auto rounded-md  mx-8 mt-4 p-4'>
    <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Copouns</h1>
        </div>
    </div>
    <div className="w-full  p-8">
    <BasicTable columns={columns} data={Cdata}/>
    </div>
    </>
  )
}



export default CopounList
