// import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { List } from '@mui/material';
// import BasicModal from '../../components/Models/Model';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { base_url } from '../../Utils/baseUrl';

const CopounList = () => {
  const [copoun , setCopoun] = useState([])
  // fetch copoun
  useEffect(() => {
    const FetchCopoun = async () => {
      let response = await fetch(`${base_url}coupon`);
      let data = await response.json();
      setCopoun(data);
    };
    FetchCopoun();
    
  }, [])
  // console.log(copoun)



  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{Number(id)}</span>;
      },
    },
    {
      header: "Copoun Code",
      accessorKey: "code",
    },
    {
      header: "Copoun Type",
      accessorKey: "type",
    },
    {
      header: "Discount",
      accessorKey: "discountValue",
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
    <div className="text-3xl font-bold p-8 bg-[#038CCC] text-white w-full shadow-md rounded-md ">
          <h1 className="uppercase">Copouns</h1>
        </div>
    </div>
    <div className="w-full  p-8">
    <BasicTable columns={columns} data={copoun}/>
    </div>
    </>
  )
}



export default CopounList
