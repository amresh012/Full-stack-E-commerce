import React, { useEffect, useState } from 'react'
import BasicTable from '../../components/AdminComponents/BasicTable';
import { base_url } from '../../Utils/baseUrl';
import { List } from '@mui/material';
import { FaEye, FaTrash } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';
import { config } from '../../Utils/axiosConfig';





// coloumns


const Quotation = () => {
    const [data, setData] = useState([]);
    const [isLoading  ,setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
//   console.log(data)

  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "_id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{(+id)+1}</span>;
      },
    },
    {
      header: "Name",
      accessorKey: "name",
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
      header: "Product ",
      accessorKey: "product",
    },
    {
      header: "Query ",
      accessorKey: "desc",
    },
    {
      header: "Action",
      cell:({row})=>
        <List className='flex items-center gap-2 justify-center cursor-pointer'>
         <div onClick={()=>deleteQuote(row.original._id)} className="bg-red-200 p-2 rounded-md hover:shadow-md">
          <FaTrash className='text-red-500'/>
         </div>
         <div onClick={()=>fetchQueryDetails(row.original._id)} className="bg-blue-200 p-2 rounded-md hover:shadow-md">
          <FaEye className='text-blue-500'/>
         </div>
        </List>
    },
  ];

// deleteQuote
  const deleteQuote = async (id) => {
    try {
        alert("Hello")
      const response = await fetch(`${base_url}quot/${id}`, {
        method: "DELETE",
        ...config,
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setReload((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };


  useEffect(() => {
    const FetchContact = async () => {
      let response = await fetch(`${base_url}quot`);
      let data = await response.json();
      setData(data);
      setIsLoading(false);
    };
    FetchContact();
    // 
  }, [reload])



  return (
    <>
    <Toaster/>
    <div className=" p-2 flex items-center justify-normal rounded-md">
        <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Quotations</h1>
        </div>
      </div>
    <div>
      <BasicTable columns={columns} data={data || []}/>
    </div>
    </>
  )
}

export default Quotation
