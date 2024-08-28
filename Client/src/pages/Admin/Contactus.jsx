import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { base_url } from '../../Utils/baseUrl';
import { List } from '@mui/material';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';

const ListProduct = () => {
  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "_id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{id}</span>;
      },
    },
    {
      header: "Name",
      accessorKey: "fullname",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Contact",
      accessorKey: "mobile",
    },
    {
      header: "Reason",
      accessorKey: "reason",
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
           {/* <div className="bg-black/20 p-2 rounded-md hover:shadow-md">
            <FaPen className='text-black'/>
           </div> */}
        </List>
    },
  ];

  // contact data fetch
  const [contact , setContact] = useState([])
  const [isLoading  ,setIsLoading] = useState(true)
  
  useEffect(() => {
    const FetchContact = async () => {
      let response = await fetch(`${base_url}contact`);
      let data = await response.json();
      setContact(data);
      setIsLoading(false);
    };
    FetchContact();
    // console.log(contact)
  }, [])

  return (
    <>
    <div className='border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4'>
    <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Contact List</h1>
        </div>
    </div>
      <div className="w-full p-8">
      <BasicTable columns={columns} data={contact} />
      </div>
    </>
  )
}

export default ListProduct
