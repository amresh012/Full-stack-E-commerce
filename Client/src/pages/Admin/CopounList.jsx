// import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { List } from '@mui/material';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { base_url } from '../../Utils/baseUrl';
import { config } from '../../Utils/axiosConfig';
import { Toaster, toast } from 'react-hot-toast';
import moment from "moment"

const CopounList = () => {
  const [copoun , setCopoun] = useState([])
  const [reload, setReload] = useState(false);
  // fetch copoun
  

  //delete copoun
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${base_url}coupon/${id}`, {
        method: "DELETE",
        ...config,
      });
      const data = await response.json();
      
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (!data.success) {
        toast.success(data.message);
        return;
      }
      setReload((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const FetchCopoun = async () => {
      let response = await fetch(`${base_url}coupon`);
      let data = await response.json();
      setCopoun(data);
    };
    FetchCopoun();
    
  }, [reload])

  
  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{Number(id)+1}</span>;
      },
    },
    {
      header: "Copoun Code",
      accessorKey: "code",
    },
    {
      header: "Copoun Type",
      accessorKey: "discountType",
    },
    {
      header: "Discount",
      accessorKey: "discountValue",
    },
    {
      header: "Expiry Date",
      accessorKey: "expiryDate",
      cell:({row})=>{
        return  <p>{moment(row.original.expiryDate).format('DD/MM/YYYY')}</p>
      }
    },
    {
      header: "Usage Limit",
      accessorKey: "usageLimit",
    },
    {
      header: "Count ",
      accessorKey: "usageCount",
    },
    {
      header: "Action",
      cell:({row})=>
      <List className='flex items-center gap-2 justify-center cursor-pointer'>
       <div className="bg-red-200 p-2 rounded-md hover:shadow-md" onClick={() =>deleteProduct(row.original._id)}>
        <FaTrash className='text-red-500'/>
       </div>
       <div className="bg-blue-200 p-2 rounded-md hover:shadow-md" onClick={() =>fetchProduct(row.original._id)}>
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
    <Toaster/>
    <div className='flex flex-col justify-around gap-12 items-center border-2 shadow-md h-auto rounded-md  mx-8 mt-4 p-4'>
    <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
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
