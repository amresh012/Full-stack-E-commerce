// import React from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable'
import { List } from '@mui/material';
import { FaEye, FaPen, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { base_url } from '../../Utils/baseUrl';
import { config } from '../../Utils/axiosConfig';
import { Toaster, toast } from 'react-hot-toast';
import moment from "moment"
import RefreshButton from '../../components/reusablesUI/RefreshButton';
import {useNavigate} from "react-router-dom"

const CopounList = () => {
  const [copoun , setCopoun] = useState([])
  const [reload, setReload] = useState(false);
  const navigate = useNavigate()
  

  //delete copoun
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${base_url}coupon/${id}`, {
        method: "DELETE",
        ...config,
      });
      const data = await response.json();
      FetchCopoun()
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
  // fetch copoun
  const FetchCopoun = async () => {
    let response = await fetch(`${base_url}coupon`);
    let data = await response.json();
    setCopoun(data);
  };

  useEffect(() => {
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
         <div 
         onClick={() => navigate(`/admin/copoun-edit/${row.original._id}`)}
         className="bg-black/20 p-2 rounded-md hover:shadow-md">
          <FaPen className='text-black'/>
         </div>
      </List>
    },
  ];

 

  return (
    <>
    <Toaster/>
    <div className='border m-2 rounded-md'>
    <div className="border-b p-4 w-full">
          <h1 className="uppercase text-gray-700 font-medium">Copouns</h1>
        </div>
    <div className=" ">
    <BasicTable columns={columns} data={copoun}/>
    </div>
    </div>
    </>
  )
}



export default CopounList
